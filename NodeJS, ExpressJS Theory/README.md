## Mục lục

<details>
  <summary>Kiến thức cốt lõi</summary>

- [I. HTTP Protocol](#i-http-protocol)
  - [1. HTTP Request methods](#1-http-request-methods)
  - [2. HTTP Response](#2-http-response)
  - [3. HTTP Status Code](#3-http-status-code)
- [II. SSR & CSR](#ii-ssr--csr)
  - [1. SSR](#1-ssr)
  - [2. CSR](#2-csr)
- [III. Cài đặt](#iii-cài-đặt)
  - [1. Cài đặt NodeJS](#1-cài-đặt-nodejs)
  - [2. Cài đặt ExpressJS](#2-cài-đặt-expressjs)
  - [3. Cài đặt Nodemon & inspector](#3-cài-đặt-nodemon--inspector)
  - [4. Cài đặt Morgan](#4-cài-đặt-morgan)
  - [5. Cài đặt Handlebars](#5-cài-đặt-handlebars)
  - [6. Cài đặt node-sass](#6-cài-đặt-node-sass)
  - [7. Cài đặt MongoDB](#7-cài-đặt-mongodb)
- [IV. Kiến thức cốt lõi](#iv-kiến-thức-cốt-lõi)
  - [1. Basic Routing](#1-basic-routing)
  - [2. Query parameters](#2-query-parameters)
  - [3. Hành vi mặc định của form](#3-hành-vi-mặc-định-của-form)
  - [4. POST method](#5-post-method)

</details>

<details>
  <summary>Xây dựng website</summary>

- [I. MVC](#i-mvc)
  - [1. Routes & Controllers](#1-routes--controllers)

</details>

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
HTTP/1.1 200 OK Date: Mon, ngày 23 tháng 5 năm 2005 22:38:34 GMT Content-Type:
text/html; charset=UTF-8 Content-Encoding: UTF-8 Content-Length: 138
Last-Modified: Wed, 08 Jan 2003 23:11:55 GMT Server: Apache/1.3.3.7 (Unix)
(Red-Hat/Linux) ETag: "3f80f-1b6-3e1cb03b" Accept-Ranges: bytes Connection:
close

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

**Morgan** dùng để logger các HTTP request

_Step 1:_ Cài đặt

```
npm install morgan --save-dev
```

_Step 2:_ Viết vào file `index.js`

```js
const express = require("express");
const app = express();
const morgan = require("morgan"); // Viết thêm vào đây
const port = 3000;

app.use(morgan("combined")); // Viết thêm vào đây

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

### 6. Cài đặt node-sass

[:arrow_up: Mục lục](#mục-lục)

**node-sass** dùng để viết sass (.scss)

_Step 1:_ Cài đặt node-sass

```
npm install node-sass --save-dev
```

_Step 2:_ Static file sử dụng

```js
app.use(express.static(path.join(__dirname, "public")));
```

_Cách set up nodemon:_

Tạo file `nodemon.json` rồi set up như sau để lắng nghe sự thay đổi của các file

```json
{
  "ext": "js json"
}
```

_Cách set up chạy node-sass:_

Trong `package.json` ta set up như sau:

```json
"scripts": {
    "start": "nodemon --inspect src/index.js",
    "watch": "node-sass --watch src/resources/scss/ --output src/public/css/",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

ta đã thêm `"watch": "node-sass --watch src/resources/scss/ --output src/public/css/"` giúp cho lắng nghe sự thay đổi của tất cả file trong thư mục `scss`

### 7. Cài đặt MongoDB
[:arrow_up: Mục lục](#mục-lục)

**Cài đặt trên Ubuntu:**

1. [MongoDB Community Server](https://www.mongodb.com/try/download/community)
2. [MongoDB Compass](https://www.mongodb.com/try/download/compass)

**Khởi động MongoDB:**

**Step 1:** Tạo thư mục chứa data

```
sudo mkdir -p [Đường_dẫn_thư_mục]
```

Nhớ xét quyền cho thư mục

```
sudo chmod 777 [Đường_dẫn_thư_mục]
```

**Step 2:** Chạy chương trình

```
mongod --dbpath [Đường_dẫn_thư_mục]
```

### 8. Cài đặt prettier, lint-staged, husky
[:arrow_up: Mục lục](#mục-lục)

**Nguồn:**

1. [prettier](https://github.com/prettier/prettier) dùng để format code cho đẹp hơn
2. [lint-staged](https://github.com/lint-staged/lint-staged) giúp tự động thực hiện kiểm tra mã nguồn và sửa lỗi (linting) chỉ trên các file đã thay đổi (staged files) trong Git
3. [husky](https://github.com/typicode/husky) giúp bạn dễ dàng quản lý và sử dụng Git hooks trong dự án của mình. Git hooks là các đoạn mã script được chạy tự động khi các sự kiện cụ thể xảy ra trong quá trình làm việc với Git, chẳng hạn như commit, push, hay merge

**Cài đặt:**

```
npm install prettier link-staged husky --save-dev
```

**Cách sử dụng prettier:**

Có thể dùng câu lệnh để chạy prettier bằng cách viết trong `package.json` sau đó chạy bằng `npm run format`

![image](https://github.com/CUNGVANTHANG/Back-end/assets/96326479/3b5347bc-35f9-4976-b84b-472431b061fe)

```
"format": "prettier --write --single-quote --trailing-comma all 'src/**/*.{js,json,scss}'",
```

`--write` dùng để ghi đè lại file

`--single-quote` dùng để thay dấu `""` thành dấu `''`

`--trailing-comma all` dùng để thêm dấu `,` ở cuối array hoặc object

**Cách sử dụng link-staged:**

Chèn đoạn mã sau vào `package.json`

```json
"lint-staged": {
    "*": "your-cmd"
  }
```

_Ví dụ:_

```
"lint-staged": {
    "src/**/*.{js,json,scss}": "prettier --write --single-quote --trailing-comma all"
  },
```

Nghĩa là khi `git add .` thì có thể thực hiện hành động nào đó với các file đã được add (gọi là staged)

**Cách sử dụng husky:**

Chèn đoạn mã sau vào `package.json`

```
"husky": {
    "hooks" : {
      "pre-commit": "npm test",
      "pre-push": "npm test",
      "...": "..."
    }
  },
```

_Ví dụ:_

```
"husky": {
    "hooks" : {
      "pre-commit": "lint-staged"
    }
  },
```

Khi mà ta `git commit -m "..."` nó sẽ tự động chạy `lint-staged` format code với prettier

### 9. Cài đặt mongoose
[:arrow_up: Mục lục](#mục-lục)

Tham khảo tại: [https://github.com/Automattic/mongoose](https://github.com/Automattic/mongoose)

Hiểu đơn giản, mongoose là object model driver đứng giữa nodejs và mongoDB để giúp nodejs làm việc mongoDB dễ dàng và chặt chẽ hơn

Mongoose là công cụ mô hình hóa document database, thiết kế để làm việc với môi trường bất đồng bộ, hỗ trợ cả Promise và callback

Cài đặt

```
npm install mongoose
```

## IV. Kiến thức cốt lõi
[:arrow_up: Mục lục](#mục-lục)

### 1. Basic Routing
[:arrow_up: Mục lục](#mục-lục)

Tham khảo tại đây: [https://expressjs.com/en/starter/basic-routing.html](https://expressjs.com/en/starter/basic-routing.html)

Định tuyến đề cập đến việc xác định cách ứng dụng phản hồi (response) yêu cầu (request) của máy khách tới điểm cuối cụ thể, đó là **URI** (hoặc đường dẫn) và phương thức yêu cầu **HTTP** cụ thể (**GET**, **POST**, v.v.).

Định nghĩa tuyến đường có cấu trúc như sau:

```
app.METHOD(PATH, HANDLER)
```

Trong đó:

- `app` là một ví dụ của express.
- `METHOD` là phương thức yêu cầu HTTP, viết thường.
- `PATH` là một đường dẫn trên máy chủ.
- `HANDLER` là hàm được thực thi khi tuyến đường được khớp.

Phản hồi `Hello World!` trên trang chủ:

```js
app.get('/', (req, res) => {
  res.send('Hello World!')
})
```

Phản hồi yêu cầu **POST** trên tuyến gốc (`/`), trang chủ của ứng dụng:

```js
app.post('/', (req, res) => {
  res.send('Got a POST request')
})
```

Phản hồi yêu cầu **PUT** tới tuyến đường `/user`:

```js
app.put('/user', (req, res) => {
  res.send('Got a PUT request at /user')
})
```

Phản hồi yêu cầu **DELETE** tuyến đường `/user`:

```js
app.delete('/user', (req, res) => {
  res.send('Got a DELETE request at /user')
})
```

### 2. Query parameters
[:arrow_up: Mục lục](#mục-lục)

![image](https://github.com/CUNGVANTHANG/Back-end/assets/96326479/26a80f16-d389-42e1-8834-a6d999e8f81e)

Khi chúng ta thực hiện hành vi search trên google thì bản chất là nó điều hướng người dùng sang 1 trang web có địa chỉ là `https://www.google.com/search?q=f8%20hoc%20lap%20trinh`

![image](https://github.com/CUNGVANTHANG/Back-end/assets/96326479/cc14f419-1d74-4ed7-a2d3-b7fc2c4492d1)

Giống như ta có thể nhập trực tiếp thì kết quả đem lại cũng như vậy

![image](https://github.com/CUNGVANTHANG/Back-end/assets/96326479/dc74e9e5-be1a-43fa-9f46-c987263af24e)

Query parameters thường sử dụng **METHOD GET**

_1 ví dụ khác:_

```
https://www.google.com/search?q=f8%20hoc%20lap%20trinh&author=sondn
```

Các params sẽ được phân cách bằng `&` như trên, trả về 1 đối tượng như sau:

![image](https://github.com/CUNGVANTHANG/Back-end/assets/96326479/d462c048-9220-4f5b-9a0c-c1971610530e)

### 3. Hành vi mặc định của form
[:arrow_up: Mục lục](#mục-lục)

```html
<div class="mt-4">
<form>
  <div class="form-group">
    <label for="search-input">Từ khóa</label>
    <input type="text" name="q" class="form-control" id="search-input" placeholder="Nhập từ khóa">
  </div>
  
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
</div>
```

Chú ý phải có `name="q"` thì mới thực hiện được hành vi mặc định của form. Chính là khi ta nhập từ khóa rồi bấm submit.

![image](https://github.com/CUNGVANTHANG/Back-end/assets/96326479/aa00dd19-ced1-4fee-a9ff-094b8a4128c0)

Ta nhận được query parameters như sau:

![image](https://github.com/CUNGVANTHANG/Back-end/assets/96326479/2406ff55-c2d7-4375-ae78-5cf899d0f2f6)


### 4. POST method
[:arrow_up: Mục lục](#mục-lục)

Muốn sử dụng phương thức `POST` ta phải thêm `method="POST"` như sau

```html
<div class="mt-4">
<form method="POST">
  <div class="form-group">
    <label for="search-input">Từ khóa</label>
    <input type="text" name="q" class="form-control" id="search-input" placeholder="Nhập từ khóa">
  </div>

  <div class="form-group">
    <label for="gender-input">Từ khóa</label>
    <select name="gender" class="form-control" id="gender-input">
      <option value="">-- Chọn giới tính --</option>
      <option value="male">Nam</option>
      <option value="female">Nữ</option>

    </select>
  </div>
  
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
</div>
```

Khi bấm submit ra sẽ được kết quả ở **Form Data**

<img src="https://github.com/CUNGVANTHANG/Back-end/assets/96326479/c183d92d-522e-4cd0-9058-44e182061329" height=200px>

## I. MVC
[:arrow_up: Mục lục](#mục-lục)

![image](https://github.com/CUNGVANTHANG/Back-end/assets/96326479/2c434bf7-07d4-498c-978b-c31f6f724ed4)

3 thành phần chính: `Model`, `View`, `Controller`

**Browser** chính là client

Còn lại sẽ là về phía Server

### 1. Routes & Controllers
[:arrow_up: Mục lục](#mục-lục)

Hiểu đơn giản cơ chế hoạt động: 

```
Browser(client) --> Web server --> Routes (Tuyến đường) --> Dispatcher (GET, POST, PUT...) --> Function Handler (Controller)
.........................Action.......................  --> Dispatcher (GET, POST, PUT...) --> Function Handler (Controller)
```

_Ví dụ:_ Biến đổi đoạn code này sang sử dụng mô hình MVC

```js
// index.js
const path = require("path");
const express = require("express");
const morgan = require("morgan");
const handlebars = require("express-handlebars");

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "public")));

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

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

app.get("/search", (req, res) => {
  res.render("search");
});

app.post("/search", (req, res) => {
  console.log(req.body);
  res.send("");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}/`);
});
```

Cấu trúc thư mục: 

![image](https://github.com/CUNGVANTHANG/Back-end/assets/96326479/be174b6a-38cf-4b3f-9146-6a03d1514685)

Sau khi biến đổi:

```js
// index.js
const path = require("path");
const express = require("express");
const morgan = require("morgan");
const handlebars = require("express-handlebars");

const app = express();
const port = 3000;

const route = require("./routes");

app.use(express.static(path.join(__dirname, "public")));

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

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

// Routes init
route(app);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}/`);
});
```

```js
// app/controller/NewsController
class NewsController {
  // [GET] /news
  index(req, res) {
    res.render("news");
  }

  // [GET] /news/:slug
  show(req, res) {
    res.send("NEWS DETAIL!!!");
  }
}

module.exports = new NewsController();


// app/controller/SiteController
class SiteController {
  // [GET] /
  index(req, res) {
    res.render("home");
  }

  // [GET] /search
  search(req, res) {
    res.render("search");
  }
}

module.exports = new SiteController();
```

```js
// routes/index.js
const newsRouter = require("./news");
const siteRouter = require("./site");

function route(app) {
  app.use("/news", newsRouter);
  app.use("/", siteRouter);
}

module.exports = route;


// routes/news.js
const express = require("express");
const router = express.Router();

const newsController = require("../app/controller/NewsController");

router.get("/:slug", newsController.show);
router.get("/", newsController.index);

module.exports = router;


// routes/site.js
const express = require("express");
const router = express.Router();

const siteController = require("../app/controller/SiteController");

router.get("/search", siteController.search);
router.get("/", siteController.index);

module.exports = router;
```

Có thể hiểu đơn giản là xây dựng router (tuyến đường) cho các page và chỉ dẫn các tuyến đường (chuyển trang) sử dụng controller hiển thị lên view cho người dùng

### 2. Model
[:arrow_up: Mục lục](#mục-lục)

Cài đặt mongoose

Cấu trúc thư mục:

![image](https://github.com/CUNGVANTHANG/Back-end/assets/96326479/346d51b6-435b-4b74-8954-7141d84ba983)

```js
// config/db/index.js

// Dùng để kết nối tới database
const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect("mongodb://localhost:27017/test", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connect successfully");
  } catch (error) {
    console.log("Connect failure");
  }
}

module.exports = { connect };
```

```js
// models/Course.js

// Dùng để lấy các trường dữ liệu trong database
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Course = new Schema({
  name: { type: String },
  age: { type: String },
  school: { type: String },
  createAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Course", Course);
```

```js
// controller/SiteController.js

// Dùng để hiển thị dữ liệu (get dữ liệu)
const Course = require("../models/Course");

class SiteController {
  // [GET] /
  async index(req, res) {
    try {
      const courses = await Course.find({});
      res.json(courses);
    } catch (error) {
      res.status(400).json({ error: "Error" });
    }
  }

  // [GET] /search
  search(req, res) {
    res.render("search");
  }
}

module.exports = new SiteController();
```

Ta có thể hiểu là từ config để kết nối, xong xây dựng model để lấy dữ liệu, xong từ controller nhận dữ liệu từ model rồi hiển thị lên view cho người dùng
