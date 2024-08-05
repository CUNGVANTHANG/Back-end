## 1. Using

#### Backend
- NodeJS/ExpressJS
- JWT
- Cookies
- MongoDB (connect using mongoose)

#### Frontend

## 2. Function

- Đăng ký
- Đăng nhập
- Xác thực
- Phân quyền

## 3. Config

```env
# .env
MONGODB_URI = mongodb+srv://mobigame2k3:fgkpixVnAVEjpX59@cluster0.x5cc3dy.mongodb.net/
JWT_ACCESS_KEY = 123456
JWT_REFRESH_KEY = 123456774434
```

```js
dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Database connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};

connectDB();
```

```js
const mongoose = require("mongoose");

// Khung xương chứa thuộc tính của user
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 20,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 50,
      unique: true,
    },
    password: {
      type: String,
      minlength: 6,
      required: true,
    },
    admin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
```

## 4. Knowledge

**Authentication** hiểu đơn giản là so sánh dữ liệu nhập với dữ liệu trong database

**Authorization** hiểu đơn giản phân quyền cho người dùng

**Store token** (Có 4 cách xử lý)
1) Local Storage (Dễ bị tấn công XSS)
2) HTTPONLY Cookie (Dễ bị tấn công CSRF -> Có thể được khắc phục SAMESITE)
3)
+ Redux Store --> Để lưu access token
+ HTTPONLY Cookie --> Để lưu refresh token
4) BFF Pattern (Backend for Frontend) --> Một backend riêng để xử lý token

**Tạo token** - có 2 loại token (access token và refresh token)

- Access token là token dùng để xác thực người dùng
- Refresh token là token dự trữ có tác dụng tạo access token mới khi access token hết hạn

**Cơ chế**

<img src="https://github.com/user-attachments/assets/299ee4fd-7dd4-4fbf-8e8f-58b069eb4e22" width="500px">

<img src="https://github.com/user-attachments/assets/963343d4-2b8a-4fc7-b092-092598b41937" width="500px">

<img src="https://github.com/user-attachments/assets/d671322b-1f7e-4935-ad83-88fb19fdfbc7" width="500px">

**Code**

- bcrypt dùng hash password
  
```js
const bcrypt = require("bcrypt");
```

- Generate Access token và Refresh token

```
const jwt = require("jsonwebtoken"); // Dùng để tạo token
```

```js
generateAccessToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        admin: user.admin,
      },
      process.env.JWT_ACCESS_KEY,
      { expiresIn: "30s" } // Thời gian hết hạn
    );
  }
```

```js
generateRefreshToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        admin: user.admin,
      },
      process.env.JWT_REFRESH_KEY,
      { expiresIn: "365d" }
    );
  }
```

- Login

```js
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
  }
```

- requestRefreshToken dùng để tạo access token mới

```js
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
  }
```

- Logout

```js
// logout thì các token sẽ bị biến mất
  logoutUser: async (req, res) => {
    // Xóa refresh token khỏi cookies
    res.clearCookie("refreshToken");

    // Xóa refresh token khỏi array (databases)
    refreshTokens = refreshTokens.filter(
      (token) => token !== req.cookies.refreshToken
    );
    return res.status(200).json("User has been logged out");
  }
```

- VerifyToken là middleware dùng để xác định Token đó đúng hay sai

```js
verifyToken: (req, res, next) => {
    // Lấy token từ header
    const token = req.headers.token;
    if (token) {
      // Token trong header phải có dạng Bearer token (vd: Bearer dsdjshdjshjdhsjdhjsh)
      const accessToken = token.split(" ")[1];
      jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
        if (err) {
          return res.status(403).json("Token is not valid");
        }
        req.user = user;

        // Đạt đủ điều kiện thì chuyển sang middleware tiếp theo
        next();
      });
    } else {
      return res.status(401).json("You are not authenticated");
    }
  }
```

- verifyTokenAndAdminAuth là middleware dùng để phân quyền

```js
// Phân quyền (nếu là chính mình sẽ tự xóa được chính mình, admin xóa được tất cả)
  verifyTokenAndAdminAuth: (req, res, next) => {
    middlewareController.verifyToken(req, res, () => {
      if (req.user.id == req.params.id || req.user.admin) {
        next();
      } else {
        return res.status(403).json("You are not allowed to do that");
      }
    });
  }
```
