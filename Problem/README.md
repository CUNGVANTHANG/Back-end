## Problem

## Mục lục

## I. JWT
### 1. Chặn hacker chiếm JWT dù đánh cắp KEYSECRET trong Database

### Problem
_Ví dụ minh họa:_ Đây là cách làm thường thấy nhất khi làm việc với JWT

```js
// steal_keysecret.problem.js
"use strict";

const jwt = require("jsonwebtoken");

const keySecret = "my_secret";

const accessToken = jwt.sign(
  {
    email: "cungvanthang2k3@gmail.com",
    password: "shdjshkvbkljljslsdsdsdsahd",
    number_phone: "012345678",
    role: "admin",
  },
  keySecret,
  { expiresIn: "1h" }
);

console.log("Access Token:", accessToken);

jwt.verify(accessToken, keySecret, (err, decoded) => {
  console.log("Decoded:", decoded);
});
```

_Kết quả:_ Chúng ta có thể thấy tất cả user đang sử dụng chung một KEYSECRET. Điều này có vẻ sẽ không tốt! Trường hợp hacker lấy được KEYSECRET thì hệ thống coi như hỏng... khi bị lộ thông tin.

<img src="https://github.com/user-attachments/assets/6efd6a73-7e5f-4a48-a7bd-5b4b6b309a3d" width="800px" >

### Solution

Chúng ta sẽ xây dựng thêm 2 key: **private key** và **public key** cho mỗi user. 

- private key: lưu ở phía user, có chức năng tạo Access token (không verify Access token)
- public key: lưu ở server (database), có chức năng verify Access token

```js
// steal_keysecret.solution.js
"use strict";

const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
  modulusLength: 4096,
});

console.log({ privateKey, publicKey });

const accessToken = jwt.sign(
  {
    email: "cungvanthang2k3@gmail.com",
    password: "shdjshkvbkljljslsdsdsdsahd",
    number_phone: "012345678",
    role: "admin",
  },
  privateKey,
  { algorithm: "RS256", expiresIn: "1h" }
);

console.log("Access Token:", accessToken);

jwt.verify(accessToken, publicKey, (err, decoded) => {
  console.log("Decoded:", decoded);
});
```

_Kết quả:_ Chúng ta có thể thấy Access token được tạo ra rất dài, quan trọng là để có thể hack được thông tin cần phải có 2 key (**private key** và **public key**)

<img src="https://github.com/user-attachments/assets/9daf534e-ba5a-4b66-93a4-590e5f499187" width="800px" >
