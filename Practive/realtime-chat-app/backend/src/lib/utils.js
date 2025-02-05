import jwt from "jsonwebtoken";

// Tạo token và lưu vào cookie
export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  // Trả về token trong cookie
  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 ngày
    httpOnly: true, // Chỉ có server mới có thể access cookie
    sameSite: "strict", // Chỉ gửi cookie khi request đến từ cùng một domain
    secure: process.env.NODE_ENV !== "development", // Chỉ gửi cookie qua HTTPS nếu không phải ở môi trường development
  });

  return token;
};
