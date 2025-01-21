# GraphQL Theory

## Mục lục
- [1. So sánh GraphQL và REST API](#1-so-sánh-graphql-và-rest-api)
- [2. Vấn đề mà REST API gặp phải là?](#2-vấn-đề-mà-rest-api-gặp-phải-là)
- [3. Operations của GraphQL](#3-operations-của-graphql)

## 1. So sánh GraphQL và REST API

| GraphQL | REST |
| :-- | :-- |
| Nó chỉ là 1 ngôn ngữ truy vấn APIs | Là 1 khái niệm, 1 loại kiến trúc mà định nghĩa 1 số ràng buộc, quy tắc cần tuân theo khi thiết kế web services | 
| Chỉ deploy 1 endpoint duy nhất và client có thể quyết định lấy những dữ liệu nào cần thiết | Deploy nhiều endpoints và mỗi endpoint thông thường sẽ trả về 1 resource duy nhất (VD như /api/v1/users sẽ trả về danh sách users, /books sẽ trả về danh sách books... |
| Sử dụng kiến trúc hướng tới phía client | Sử dụng kiến trúc hướng tới phía server | 
| Không có cơ chế caching được tính hợp sẵn mà phải sử dụng các thư viện bên ngoài | Có tính năng caching mặc định |
| Không hỗ trợ API versioning  | Hỗ trợ API versioning | 
| Dữ liệu trả về chỉ có JSON | Dữ liệu trả về có thể XML, JSON và YAML | 
| Có hệ thống định nghĩa kiểu dữ liệu rõ ràng và documents sẽ được tạo tự động | Không có |

## 2. Vấn đề mà REST API gặp phải là?
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

## 3. Operations của GraphQL
[:arrow_up: Mục lục](#mục-lục)

**1. Query**

Query trong GraphQL là một câu lệnh để lấy dữ liệu (tương đương với **HTTP GET** trong **REST API**). Bạn chỉ cần yêu cầu chính xác các trường dữ liệu mà bạn muốn. Ví dụ:

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

**2. Mutation**

Dùng để thay đổi dữ liệu trên server, chẳng hạn như thêm, sửa hoặc xóa dữ liệu. Tương đương với HTTP POST/PUT/DELETE trong REST API

_Ví dụ:_

```graphql
mutation {
  addUser(input: {name: "Alice", email: "alice@example.com"}) {
    id
    name
  }
}
```

**3. Subscription**

Dùng để theo dõi sự kiện từ server, tức là server sẽ gửi dữ liệu thời gian thực khi có thay đổi. Cần thiết lập kết nối WebSocket để hoạt động

_Ví dụ:_

```graphql
subscription {
  newUser {
    id
    name
    email
  }
}
```

**Điểm đặc biệt:**

**Operations có thể lồng nhau**: Bạn có thể gửi nhiều operations trong một yêu cầu.

```graphql
query {
  user(id: "1") {
    id
    name
    posts {
      title
      comments {
        content
      }
    }
  }
}
```

**Variables**: Các operations có thể sử dụng biến để tăng tính linh hoạt.

```graphql
query GetUser($id: ID!) {
  user(id: $id) {
    name
    email
  }
}
```

Khi gửi request:

```json
{
  "id": "1"
}
```

## 4. Thiết lập Backend để hỗ trợ GraphQL Query (Apollo Server)
