# GraphQL Theory

## Mục lục
- [1. Vấn đề mà REST API gặp phải là?](#1-vấn-đề-mà-rest-api-gặp-phải-là)
- [2. Cấu trúc Query trong GraphQL](#2-cấu-trúc-query-trong-graphql)

## 1. Vấn đề mà REST API gặp phải là?
[:arrow_up: Mục lục](#mục-lục)

Vấn đề mà REST API gặp phải là over fetching và under fetching. GraphQL có thể khắc phục được 2 vấn đề này của REST API

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

## 2. Cấu trúc Query trong GraphQL
[:arrow_up: Mục lục](#mục-lục)

Query trong GraphQL là một câu lệnh để lấy dữ liệu. Bạn chỉ cần yêu cầu chính xác các trường dữ liệu mà bạn muốn. Ví dụ:

```graphql
query {
  user(id: "1") {
    id
    name
    email
  }
}
```

Trong ví dụ này:

- `query` là từ khóa chỉ định một truy vấn.
- `user(id: "1")` là một field, và `id: "1"` là một tham số truyền vào.
- Các trường con (`id`, `name`, `email`) là những dữ liệu bạn yêu cầu từ API.

## 3. Thiết lập Backend để hỗ trợ GraphQL Query (Apollo Server)
