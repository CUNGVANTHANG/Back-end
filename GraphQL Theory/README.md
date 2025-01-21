# GraphQL Theory

## Mục lục
- [1. So sánh GraphQL và REST API](#1-so-sánh-graphql-và-rest-api)
- [2. Vấn đề mà REST API gặp phải là?](#2-vấn-đề-mà-rest-api-gặp-phải-là)
- [3. Operations của GraphQL](#3-operations-của-graphql)
- [4. Thiết lập Backend để hỗ trợ GraphQL Query (Apollo Server)](#4-thiết-lập-backend-để-hỗ-trợ-graphql-query-apollo-server)
  - [4.1. Schema & Types](#41-schema--types)

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

> Điểm mạnh của GraphQL là bạn có thể chỉ định chính xác những thông tin cần trả về, giúp giảm băng thông và tối ưu hóa dữ liệu

Sử dụng extension trong Visual Studio Code là **GraphQL: Syntax Highlighting**

![image](https://github.com/user-attachments/assets/907a13cd-a662-4008-b454-e0ca5d597986)

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
[:arrow_up: Mục lục](#mục-lục)

Khởi tạo `package.json`, sử dụng `type="module"` thì Node.js hiểu rằng các file `.js` trong dự án là ESM. Với ESM, bạn sử dụng cú pháp `import` và `export` thay vì `require` và `module.exports`

```
npm init -y
npm pkg set type="module"
```

Cài đặt package 

```
npm install @apollo/server graphql
```

Khởi động dự án với

```js
// index.js
import { ApolloServer } from `@apollo/server`
import { startStandaloneServer } from "@apollo/server/standalone"

// server setup
const server = new ApolloServer({
    // typeDefs
    // resolvers
})

const { url } = await startStandaloneServer(server, {
    listen: {
        port: 4000
    }
})

console.log('Server ready at port', 4000)
```

Trong đó: Tạo một server mới từ lớp ApolloServer. Hai thuộc tính quan trọng cần cung cấp:
- `typeDefs`: Định nghĩa schema GraphQL (các kiểu dữ liệu, query, mutation, subscription).
- `resolvers`: Logic xử lý các request GraphQL tương ứng với schema.

### 4.1. Schema & Types
[:arrow_up: Mục lục](#mục-lục)

Các loại types chính của GraphQL:

- [Scalars (Kiểu nguyên thủy)](#1-scalars-kiểu-nguyên-thủy)
- [Object Types](#2-object-types)
- [Query Type](#3-query-type)
- [Mutation Type](#4-mutation-type)
- [Enum Types](#5-enum-types)
- [Input Types](#6-input-types)
- [Union Types](#7-union-types)
- [Interface Types](#8-interface-types)
- [List Types](#9-list-types)
- [Non-Null Types](#10-non--null-types)

#### 1. Scalars (Kiểu nguyên thủy)
[:arrow_up: Schema & Types](#41-schema--types)

GraphQL có 5 scalar types mặc định(`Int`, `Float`, `String`, `Boolean`, `ID` dùng để định danh duy nhất, thường được dùng cho các trường như id của object.)

#### 2. Object Types
[:arrow_up: Schema & Types](#41-schema--types)

Object types là thành phần chính trong schema. Mỗi object type chứa một tập hợp các trường (fields), và mỗi trường có một kiểu dữ liệu (scalar, object, hoặc loại khác)

```graphql
type User {
  id: ID!
  name: String!
  email: String
  age: Int
}
```

Trong đó:

- `id`: Kiểu `ID`, bắt buộc (`!`).
- `name`: Kiểu `String`, bắt buộc.
- `email`: Kiểu `String`, không bắt buộc.
- `age`: Kiểu `Int`.

#### 3. Query Type
[:arrow_up: Schema & Types](#41-schema--types)

Query là root type mặc định cho các truy vấn (fetch data). Nó định nghĩa các điểm đầu vào (entry points) của API để lấy dữ liệu.

```graphql
type Query {
  users: [User!]!
  user(id: ID!): User
}
```

Trong đó:

- `users`: Trả về một danh sách người dùng (`[User!]!`).
- `user(id: ID!)`: Trả về một người dùng cụ thể dựa trên `id`.

#### 4. Mutation Type
[:arrow_up: Schema & Types](#41-schema--types)

Mutation là root type dùng để thay đổi dữ liệu (create, update, delete). Nó tương tự như các HTTP POST, PUT, DELETE trong REST API.

```graphql
type Mutation {
  addUser(name: String!, email: String!): User!
  updateUser(id: ID!, name: String): User
  deleteUser(id: ID!): Boolean
}
```

Trong đó:

- `addUser`: Thêm người dùng mới và trả về đối tượng `User`.
- `updateUser`: Cập nhật thông tin người dùng.
- `deleteUser`: Xóa người dùng và trả về kết quả `Boolean`.

#### 5. Enum Types
[:arrow_up: Schema & Types](#41-schema--types)

Enum (enumeration) là tập hợp các giá trị hằng số, thường dùng để định nghĩa các lựa chọn cố định.

```graphql
enum Role {
  ADMIN
  USER
  GUEST
}
```

Sử dụng trong một object:

```graphql
type User {
  id: ID!
  name: String!
  role: Role!
}
```

#### 6. Input Types
[:arrow_up: Schema & Types](#41-schema--types)

#### 7. Union Types
[:arrow_up: Schema & Types](#41-schema--types)

#### 8. Interface Types
[:arrow_up: Schema & Types](#41-schema--types)

#### 9. List Types
[:arrow_up: Schema & Types](#41-schema--types)

#### 10. Non-Null Types
[:arrow_up: Schema & Types](#41-schema--types)
