## Mục lục
- [I. HTTP Protocol](#i-http-protocol)
- [II. SSR & CSR](#ii-ssr--csr)
- [III. Cài đặt](#iii-cài-đặt)

## I. HTTP Protocol
[:arrow_up: Mục lục](#mục-lục)

_Tham khảo tại đây_: https://vi.wikipedia.org/wiki/Hypertext_Transfer_Protocol\

HTTP (HyperText Transfer Protocol - Giao thức truyền tải siêu văn bản)

_Ví dụ:_

<img src="https://github.com/CUNGVANTHANG/NodeJS/assets/96326479/7923ee35-bbb9-49ad-b817-1ce66ecb2e41" width="500px">

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

## III. Cài đặt
[:arrow_up: Mục lục](#mục-lục)

### 1. Cài đặt NodeJS
[:arrow_up: Mục lục](#mục-lục)

Cài đặt tại trang web https://nodejs.org/en/download/current

hoặc tham khảo cách cài bằng câu lệnh

### 2. Cài đặt ExpressJS
[:arrow_up: Mục lục](#mục-lục)

Tham khảo thêm tại đây https://www.npmjs.com/package/express

_Step 1:_ Khởi tạo `package.json`

```
npm init
```

_Step 2:_ Install

```
npm install express
```

File `package.json`

<img src="https://github.com/CUNGVANTHANG/NodeJS/assets/96326479/d0b826d8-2a1c-4d45-ae19-65b3635fc98d" width="500px">

Chú ý `dependencies` là nơi lưu trữ thông tin những phụ thuộc (hiểu đơn giản là thư viện cần dùng)

File `package-lock.json` là nơi lưu trữ thông tin những phụ thuộc của phụ thuộc (hiểu đơn giản là trong `express` sẽ có thể phụ thuộc với nhiều thứ viện khác). 

<img src="https://github.com/CUNGVANTHANG/NodeJS/assets/96326479/4dff0868-9805-419d-b5cc-4fb11bec4c78" width="500px">

_Step 3:_ Chạy chương trình đầu tiên bằng câu lệnh `node index.js`

```js
const express = require("express"); // Nhập các module hoặc thư viện từ các tệp khác
const app = express(); // Trả về đối tượng
const port = 3000; // Port

// Route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}/`);
});
```

<img src="https://github.com/CUNGVANTHANG/NodeJS/assets/96326479/d1c5020b-c77e-4de9-a0a8-9817a82847a0" width="500px">

### 3. Cài đặt Nodemon & inspector
[:arrow_up: Mục lục](#mục-lục)

Tham khảo thêm tại đây https://www.npmjs.com/package/nodemon

- **Nodemon** giúp lắng nghe sự thay đổi của file trong quá trình phát triển (dev)

_Step 1:_ Install

```
npm install nodemon --save-dev
```

_Step 2:_ Cách sử dụng

Cách 1: Chạy trực tiếp

```
nodemon index.js
```

Cách 2: Gán vào lệnh `script` trong `package.json` như sau:

![image](https://github.com/CUNGVANTHANG/NodeJS/assets/96326479/d6ff8d77-db75-4340-aa11-9a390b2877a0)

```
npm start
```

- **inspector** dùng để debug code

_Step 1:_ Cách sử dụng

Cách 1: Chạy trực tiếp

```
nodemon --inspect index.js
```

Cách 2: Gán vào lệnh `script` trong `package.json` như sau:

![image](https://github.com/CUNGVANTHANG/NodeJS/assets/96326479/3d21c7ca-7bae-46ec-8958-3332203ee1ac)

```
npm start
```

_Step 2:_ Bấm vào biểu tượng màu xanh lá

<img src="https://github.com/CUNGVANTHANG/NodeJS/assets/96326479/4935419e-0e7e-4173-aebc-0c86d8cdb69e" width="500px">

Thực hiện Debug tại đây: 

<img src="https://github.com/CUNGVANTHANG/NodeJS/assets/96326479/d6413e3b-aedf-458b-8ab8-ff7a4f30d783" width="500px">

### 4. Cài đặt Morgan
[:arrow_up: Mục lục](#mục-lục)

Tham khảo thêm tại đây https://www.npmjs.com/package/morgan

Morgan dùng để logger các HTTP request

_Step 1:_ Cài đặt

```
npm install morgan --save-dev
```

_Step 2:_ Viết vào file `index.js` 

```js
const express = require("express"); 
const app = express(); 
const morgan = require('morgan'); // Viết thêm vào đây
const port = 3000; 

app.use(morgan('combined')); // Viết thêm vào đây

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}/`);
});
```

Kết quả: Giúp xem được request HTTP

![image](https://github.com/CUNGVANTHANG/NodeJS/assets/96326479/f7ff900e-660e-4c6d-b366-b5d907312cc1)

### 5. Cài đặt Handlebars
[:arrow_up: Mục lục](#mục-lục)

Tham khảo thêm tại đây https://www.npmjs.com/package/express-handlebars

**Handlebars** này giúp ta quản lý file HTML/CSS dễ dàng hơn thay vì viết trực tiếp vào như này (khiến rất khó quản lý và viết code)

```js
app.get("/", (req, res) => {
  res.send("<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    
</body>
</html>");
});
```

Ngoài **Handlebars** ra còn có **Pug** tham khảo tại https://www.npmjs.com/package/pug

_Step 1:_ Cài đặt handlebars

```
npm install express-handlebars
```

Cấu trúc thư mục

```
.
├── index.js
└── views
    ├── home.handlebars
    └── layouts // Nơi viết những thành phần chung
        └── main.handlebars
```

_Step 2:_ Ví dụ 

Cấu trúc thư mục: 

![image](https://github.com/CUNGVANTHANG/NodeJS/assets/96326479/34aa277d-ff3b-4441-8f64-b713b3f953bb)

```js
const express = require("express");
const morgan = require("morgan");
const handlebars = require("express-handlebars");
const path = require("path");

const app = express();
const port = 3000;

// HTTP logger
app.use(morgan("combined"));

// Template engine
app.engine(
  "hbs",
  handlebars.engine({
    extname: ".hbs", // Cấu hình đổi tên .handlebars thành .hbs
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources/views")); // __dirname là đường dẫn hiện tại
// Sử dụng join để nối tới views

// Router
app.get("/", (req, res) => {
  res.render("home"); // Render ra giao diện
});

app.get("/news", (req, res) => {
  res.render("news");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}/`);
});
```

