## NodeJS Backend Architecture

## Mục lục

- [1. Init project](#1-init-project)

## 1. Init project
[:arrow_up: Mục lục](#mục-lục)

[Source code tại đây](./init_project/)

Những folder và package cần thiết cần thiết khi khởi tạo dự án

**Cấu trúc thư mục:**

<image src="https://github.com/user-attachments/assets/33e110dc-3308-4a24-af84-ff4219f490c9" width="600px" >
<image src="https://github.com/user-attachments/assets/8cff09ed-cb56-4c8c-8e4c-5fef26474c10" >
  
**Package cần thiết:**

```
npm install express --save
npm install morgan helmet compression --save-dev
```

Trong đó:

- `morgan` dùng để log các request HTTP

![image](https://github.com/user-attachments/assets/6115fa81-9128-42fe-b711-aa056089b382)

- `helmet` dùng để bảo vệ ứng dụng 

| Khi chưa dùng `helmet` | Sau khi dùng `helmet` |
| :--: | :--: |
| ![image](https://github.com/user-attachments/assets/173bd360-b04f-4990-806b-c64e64b6fa3e) | ![image](https://github.com/user-attachments/assets/d830c3ee-1f30-4b93-8cc0-2c1b032d1ac6) |

- `compression` dùng để nén dữ liệu phản hồi

Chúng ta thử tạo 1 request dưới đây

```js
app.get("/", (req, res, next) => {
  const strCompress = "Hello World";
  return res
    .status(200)
    .json({ message: strCompress, metadata: strCompress.repeat(100000) });
});
```

Khi chưa dùng `compression`: Size là 1.1 MB

![image](https://github.com/user-attachments/assets/88bd0f3a-4503-4f8b-97ff-3e27188ba514) 

Sau khi dùng `compression`: Size là 995 B

![image](https://github.com/user-attachments/assets/5696a095-243d-4007-ab65-b2acd3d3ea25)

## 2. Connect mongodb
[:arrow_up: Mục lục](#mục-lục)

**1. Vấn đề connect mongodb trong node.js**

Cách connect mongodb trong node.js thường xuyên được sử dụng hiện nay.

```js
"use strict";

import mongoose from "mongoose";

const connectString = `mongodb+srv://...`;

const connectDB = () => {
  mongoose
    .connect(connectString)
    .then((_) => console.log("Connectd MongoDB Success"))
    .catch((err) => console.error("Error connect"));

  // dev
  if (1 === 1) {
    mongoose.set("debug", true);
    mongoose.set("debug", { color: true });
  }
};

export default connectDB;
```

Mặc dù Node.js có **cơ chế cache module**, cho phép bạn khai báo và export một kết nối ngay trong module để đảm bảo rằng kết nối đó chỉ được tạo ra một lần, nhưng nếu bạn muốn **đảm bảo tính nhất quán khi làm việc với các ngôn ngữ khác** (như Java, C#, v.v.) - nơi mà thường áp dụng **mẫu thiết kế Singleton** để quản lý kết nối

Bạn cũng có thể áp dụng mẫu Singleton trong Node.js để kết nối đến database như sau:

```js
"use strict";

import mongoose from "mongoose";

const connectString = `mongodb+srv://...`;

class Database {
  constructor() {
    this.connectDB();
  }

  connectDB(type = "mongodb") {
    mongoose
      .connect(connectString)
      .then((_) => console.log("Connectd MongoDB Success"))
      .catch((err) => console.error("Error connect"));

    // dev
    if (1 === 1) {
      mongoose.set("debug", true);
      mongoose.set("debug", { color: true });
    }
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new Database();
    }
    return this.instance;
  }
}

export default Database.getInstance();
```

**2. Kiểm tra hệ thống có bao nhiêu connect**

Ta tạo file `check.connect.js` trong thư mục `/helpers`

```js
"use strict";

import mongoose from "mongoose";

const countConnect = () => {
  const numConnection = mongoose.connections.length;
  console.log(`Number of connections: ${numConnection}`);
};

export { countConnect };
```

**3. Thông báo khi server quá tải connect**

Ta tạo file `check.connect.js` trong thư mục `/helpers`

```js
"use strict";

import mongoose from "mongoose";
import os from "os";
import process from "process";

const _SECONDS = 5000;

const checkOverload = () => {
  setInterval(() => {
    const numConnection = mongoose.connections.length;
    const numCores = os.cpus().length;
    const memoryUsage = process.memoryUsage().rss;

    // Example maximum number of connections based on number osf cores
    const maxConnection = numCores * 5;

    console.log(`Active connections: ${numConnection}`);
    console.log(`Memory usage: ${memoryUsage / 1024 / 1024} MB`);

    if (numConnection > maxConnection) {
      console.log("Connection overload detected");
    }
  }, _SECONDS); // Monitor every 5 seconds
};

export { checkOverload };
```
