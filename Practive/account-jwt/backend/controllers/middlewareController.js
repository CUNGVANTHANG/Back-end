const jwt = require("jsonwebtoken");

const middlewareController = {
  // Verify token
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
  },

  // Phân quyền (nếu là chính mình sẽ tự xóa được chính mình, admin xóa được tất cả)
  verifyTokenAndAdminAuth: (req, res, next) => {
    middlewareController.verifyToken(req, res, () => {
      if (req.user.id == req.params.id || req.user.admin) {
        next();
      } else {
        return res.status(403).json("You are not allowed to do that");
      }
    });
  },
};

module.exports = middlewareController;
