const User = require("../model/User");
const jwt = require("jsonwebtoken"); // Dùng để tạo token
const bcrypt = require("bcrypt"); // Dùng để hash password

let refreshTokens = []; // Array này có tác dụng lưu trữ refresh token - Tương ứng với databases
const authController = {
  registerUser: async (req, res) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password, salt);

      // Create new user
      const newUser = await new User({
        username: req.body.username,
        email: req.body.email,
        password: hashed,
      });

      // Save to database
      const user = await newUser.save();
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  generateAccessToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        admin: user.admin,
      },
      process.env.JWT_ACCESS_KEY,
      { expiresIn: "30s" }
    );
  },

  generateRefreshToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        admin: user.admin,
      },
      process.env.JWT_REFRESH_KEY,
      { expiresIn: "365d" }
    );
  },

  loginUser: async (req, res) => {
    try {
      // Tìm user trong database
      const user = await User.findOne({
        username: req.body.username,
      });

      if (!user) {
        return res.status(404).json("User not found");
      }

      // So sánh password người dùng nhập với password trong database
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validPassword) {
        return res.status(400).json("Wrong password");
      }

      // Trả về user nếu user tồn tại và password đúng
      if (user && validPassword) {
        // Tạo token - có 2 loại token (access token và refresh token)
        // Access token là token dùng để xác thực người dùng
        const accessToken = authController.generateAccessToken(user);

        // Refresh token là token dự trữ có tác dụng tạo access token mới khi access token hết hạn
        const refreshToken = authController.generateRefreshToken(user);

        refreshTokens.push(refreshToken);

        // Lưu refresh token vào cookies
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: false, // true khi deploy lên production
          path: "/",
          sameSite: "strict", // Dùng để chống tấn công CSRF
        });

        const { password, ...others } = user._doc;

        return res.status(200).json({ ...others, accessToken });
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  // Thường lưu refresh token vào redis
  // --> Tác dụng dùng để khi mà access token hết hạn thì dùng refresh token để tạo access token mới
  requestRefreshToken: async (req, res) => {
    // Lấy refresh token từ cookies
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(403).json("User not authenticated");
    }

    // Kiểm tra refresh token có trong array refreshTokens không
    // (Hiểu đơn giản khi có người muốn thay đổi refresh token của mình thì sẽ không được phép)
    if (!refreshTokens.includes(refreshToken)) {
      return res.status(403).json("Refresh token is not valid");
    }

    jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
      if (err) {
        return res.status(403).json("Token is not valid");
      }

      // Lọc bỏ refresh token cũ ra khỏi Array
      refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

      // Tạo mới access token và refresh token
      const newAccessToken = authController.generateAccessToken(user);
      const newRefreshToken = authController.generateRefreshToken(user);

      refreshTokens.push(newRefreshToken);

      // Lưu refresh token vào cookies
      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: false, // true khi deploy lên production
        path: "/",
        sameSite: "strict", // Dùng để chống tấn công CSRF
      });

      return res.status(200).json({ accessToken: newAccessToken });
    });
  },

  // logout thì các token sẽ bị biến mất
  logoutUser: async (req, res) => {
    // Xóa refresh token khỏi cookies
    res.clearCookie("refreshToken");

    // Xóa refresh token khỏi array (databases)
    refreshTokens = refreshTokens.filter(
      (token) => token !== req.cookies.refreshToken
    );
    return res.status(200).json("User has been logged out");
  },
};

module.exports = authController;

// Store token (Có 4 cách)
// 1) Local Storage (Dễ bị tấn công XSS)
// 2) HTTPONLY Cookie (Dễ bị tấn công CSRF -> Có thể được khắc phục SAMESITE)
// 3)
// + Redux Store --> Để lưu access token
// + HTTPONLY Cookie --> Để lưu refresh token
// 4) BFF Pattern (Backend for Frontend) --> Một backend riêng để xử lý token
