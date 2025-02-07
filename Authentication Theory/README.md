## Authentication

## 1. Một số authentication phổ biến

Có nhiều phương thức xác thực (authentication) khác nhau, tùy thuộc vào mức độ bảo mật và tính tiện lợi. Dưới đây là các loại authentication phổ biến nhất:

**1. Password-based Authentication (Xác thực bằng mật khẩu)**: Người dùng nhập username + password để đăng nhập.

**2. Two-Factor Authentication (2FA) - Xác thực hai yếu tố**: Kết hợp mật khẩu + một yếu tố bảo mật khác.

**3. Multi-Factor Authentication (MFA) - Xác thực nhiều yếu tố**: Kết hợp từ 2 yếu tố trở lên (không chỉ mật khẩu + OTP mà có thể thêm vân tay, face ID...).

**4. Token-based Authentication (Xác thực bằng token)**: Sau khi người dùng đăng nhập bằng mật khẩu, hệ thống cấp một token (**JWT**, **OAuth token**, **API token**, v.v.).

**5. Biometric Authentication (Xác thực sinh trắc học)**: Xác thực bằng đặc điểm sinh trắc học của người dùng.

**6. Certificate-based Authentication (Xác thực bằng chứng chỉ số)**: Dùng chứng chỉ số (digital certificate) để xác thực người dùng hoặc thiết bị.

**7. Social Authentication (Xác thực qua tài khoản mạng xã hội)**: Hệ thống sử dụng OAuth 2.0 để lấy thông tin từ mạng xã hội.

## 2. Sự khác nhau authentication và authorization

Authentication (Xác thực) → Kiểm tra danh tính người dùng (Bạn là ai?).

Authorization (Ủy quyền) → Kiểm tra quyền của người dùng (Bạn có quyền truy cập không?).
