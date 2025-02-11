## NodeJS Backend Architecture

## 1. Init project

[Source code tại đây](/init_project/)

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

