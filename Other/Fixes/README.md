## 1. Sửa lỗi `npm error code ERESOLVE`

![image](https://github.com/user-attachments/assets/59c1b36b-e8c3-4c07-b8e0-861489738d32)

Cách khắc phục thêm `--legacy-peer-deps` vào cuối

```
npm install --save-exact @nestjs/mongoose@9.2.2 mongoose@7.1.1 --legacy-peer-deps
```
