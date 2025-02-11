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

[Source code tại đây](./connect_mongodb/)

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

**4. Có nên `disconnect()` liên tục trong node.js hay không?**

Ở một số ngôn ngữ khác (như Java, C#) bạn có thể có mô hình quản lý kết nối theo kiểu "mở-kết nối, thực hiện giao dịch, đóng kết nối" cho mỗi giao dịch. Tuy nhiên, trong Node.js, với tính chất của ứng dụng event-driven và server chạy liên tục, mô hình này không được áp dụng vì sẽ gây tốn kém tài nguyên và không hiệu quả. Việc giữ kết nối này sẽ giúp giảm overhead của việc mở và đóng kết nối liên tục, đồng thời tận dụng cơ chế connection pooling để cải thiện hiệu năng

Khi một ứng dụng cần giao tiếp với MongoDB, thay vì mở và đóng kết nối liên tục cho mỗi truy vấn (việc này tốn thời gian và tài nguyên), ứng dụng sẽ tạo ra một connection pool – một tập hợp các kết nối đã được mở sẵn. Khi có một truy vấn, một kết nối từ pool sẽ được cấp phát để xử lý yêu cầu đó và sau khi hoàn thành, kết nối sẽ được trả lại pool để sử dụng cho các truy vấn tiếp theo.

Thay vì đóng kết nối sau mỗi thao tác, bạn chỉ nên thực hiện đóng kết nối (disconnect) khi server tắt hoặc khi bạn thực hiện một quá trình shutdown một cách "graceful". Ví dụ, trong sự kiện `SIGINT` (Ctrl+C), bạn có thể gọi `mongoose.disconnect()` để đảm bảo rằng tất cả kết nối đến MongoDB được đóng một cách an toàn

**5. PoolSize là gì. Vì sao nó lại quan trọng?**

PoolSize chính là số lượng kết nối tối đa mà pool này có thể giữ cùng lúc.

Nếu có nhiều truy vấn đến cùng lúc, và số lượng truy vấn vượt quá số lượng kết nối có sẵn trong pool, các truy vấn đó sẽ phải chờ cho đến khi có kết nối được trả lại từ pool.

Cấu hình pool size hợp lý giúp cân bằng giữa hiệu năng (xử lý nhiều truy vấn đồng thời) và tài nguyên hệ thống (tránh mở quá nhiều kết nối không cần thiết).

**6. Nếu vượt quá kết nối PoolSize?**

_Ví dụ_: 

Nếu cấu hình maxPoolSize là 50, thì pool sẽ chỉ giữ tối đa 50 kết nối mở đồng thời. Trong trường hợp có 51 truy vấn cùng lúc:

- **Kết nối thứ 51 sẽ không được mở ngay lập tức mà sẽ được đặt vào hàng đợi**.
- Khi một trong 50 kết nối hiện có hoàn thành công việc và được trả lại pool, kết nối thứ 51 sẽ được cấp phát để xử lý truy vấn của nó.

Như vậy, các truy vấn vượt quá giới hạn pool sẽ phải chờ cho đến khi có kết nối trống trong pool để thực hiện.


