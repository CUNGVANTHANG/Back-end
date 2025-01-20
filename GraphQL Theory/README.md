## GraphQL Theory

## 1. Vấn đề mà REST API gặp phải là?

**Over fetching**: Một endpoint cung cấp quá nhiều dữ liệu không cần thiết so với yêu cầu

Ví dụ: 

```json
{
  "id": "1",
  "name": "thang",
  "address": "Ha Noi",
  "description": "........",
  "thumbnail": ".......",
  "title": "......",
  "phone": "......."
}
```

Ta chỉ muốn lấy thông tin `id`, `name`, `thumbnail`, còn những các dữ liệu khác sẽ dư thừa trong endpoint này

**Under fetching**: Một endpoint không cung cấp đủ dữ liệu cần thiết, dẫn đến việc phải thực hiện nhiều request đến các endpoint khác nhau để lấy dữ liệu bổ sung.

Ví dụ: 

```json
{
  "id": "1",
  "name": "thang",
  "address": "Ha Noi",
  "description": "........",
  "thumbnail": ".......",
  "title": "......",
  "phone": "......."
}
```

```json
  "id": "1",
  "author": ".....",
  "message": "...."
```

Ta phải gọi 2 endpoint để lấy ra được thông tin `id`, `author`, `title`

