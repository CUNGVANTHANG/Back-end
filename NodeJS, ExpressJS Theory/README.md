## Mục lục
- [I. HTTP Protocol](#i-http-protocol)
- [II. SSR & CSR](#ii-ssr--csr)

## I. HTTP Protocol
[:arrow_up: Mục lục](#mục-lục)

_Tham khảo tại đây_: https://vi.wikipedia.org/wiki/Hypertext_Transfer_Protocol\

HTTP (HyperText Transfer Protocol - Giao thức truyền tải siêu văn bản)

_Ví dụ:_

![image](https://github.com/CUNGVANTHANG/NodeJS/assets/96326479/7923ee35-bbb9-49ad-b817-1ce66ecb2e41)

### 1. HTTP Request methods
[:arrow_up: Mục lục](#mục-lục)

- **GET**: GET được sử dụng để lấy lại thông tin từ máy chủ đã cung cấp bởi sử dụng một URI đã cung cấp. Các yêu cầu sử dụng GET chỉ nhận dữ liệu và không có ảnh hưởng gì tới dữ liệu.
- **HEAD**: Tương tự như GET, nhưng nó truyền tải dòng trạng thái và khu vực header.
- **POST**: Một yêu cầu POST sử dụng các mẫu HTML để gửi dữ liệu tới máy chủ, như thông tin khách hàng, file tải lên,...
- **PUT**: Thay đổi tất cả các đại diện hiện tại của nguồn mục tiêu với nội dung được tải lên.
- **DELETE**: Gỡ bỏ tất cả các đại diện hiện tại của nguồn mục tiêu bởi URI.
- **CONNECT**: Thiết lập một tunnel tới máy chủ được xác định bởi URI đã cung cấp.
- **OPTIONS**: Miêu tả các chức năng giao tiếp cho nguồn mục tiêu.
- **TRACE**: Trình bày một vòng lặp kiểm tra thông báo song song với path tới nguồn mục tiêu.

### 2. HTTP Response
[:arrow_up: Mục lục](#mục-lục)

Khi nhận và phiên dịch một HTTP Request, máy chủ sẽ gửi tín hiệu phản hồi là một HTTP Response bao gồm các thành phần sau:

- Một dòng trạng thái (Status-Line)
- Không hoặc nhiều hơn các trường Header (General | Response | Entity) được theo sau CRLF
- Một dòng trống chỉ dòng kết thúc của các trường header
- Một phần thân thông báo tùy ý

```html
HTTP/1.1 200 OK
Date: Mon, ngày 23 tháng 5 năm 2005 22:38:34 GMT
Content-Type: text/html; charset=UTF-8
Content-Encoding: UTF-8
Content-Length: 138
Last-Modified: Wed, 08 Jan 2003 23:11:55 GMT
Server: Apache/1.3.3.7 (Unix) (Red-Hat/Linux)
ETag: "3f80f-1b6-3e1cb03b"
Accept-Ranges: bytes
Connection: close

<html>
<head>
  <title>An Example Page</title>
</head>
<body>
  Hello World, this is a very simple HTML document.
</body>
</html>
```

### 3. HTTP Status Code
[:arrow_up: Mục lục](#mục-lục)

- **1xx**: Thông tin
- **2xx**: Thành công
- **3xx**: Sự điều hướng lại
- **4xx**: Lỗi Client
- **5xx**: Lỗi Server

## II. SSR & CSR
[:arrow_up: Mục lục](#mục-lục)

### 1. SSR
[:arrow_up: Mục lục](#mục-lục)

SSR (Sever Side Rendering)

_Ví dụ:_

![image](https://github.com/CUNGVANTHANG/NodeJS/assets/96326479/b712f390-46df-40cf-a6f1-d0ac13fc1d5d)

Trang web hiển thị nhiều dòng code HTML, CSS có sẵn (trả từ phía Sever), không phải do JavaScript render ra.

### 2. CSR
[:arrow_up: Mục lục](#mục-lục)

CSR (Client Side Rendering)

![image](https://github.com/CUNGVANTHANG/NodeJS/assets/96326479/8281142b-4943-463d-bfbc-9884c5d48dd3)

Trang web hiển thị ít code hơn là một dấu hiệu sử dụng CSR (trả từ phía người dùng). Chú ý thẻ `<main id="main"></main>` là nơi mà JavaScript sẽ render ra đoạn mã HTML, CSS trong đó.
