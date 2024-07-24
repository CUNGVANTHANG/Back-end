## Mục lục

<details>
  <summary>Kiến thức cốt lõi</summary>

- [1. Cài đặt](#1-cài-đặt)
- [2. Chạy chương trình đầu tiên](#2-chạy-chương-trình-đầu-tiên)
- [3. Pipes](#3-pipes)

</details>

## I. Kiến thức cốt lõi
### 1. Cài đặt

**Cài đặt Nest CLI**

```
npm install -g @nestjs/cli
```

**Cài đặt project**

```
nest new [tên_project]
```

**Cấu trúc thư mục của NestJS**

`tsconfig.json` dùng để cấu hình TypeScript code

**Chạy chương trình**

```
npm run start:dev
```

### 2. Chạy chương trình đầu tiên

**Cấu trúc thư mục:**

```
src
├── app.module.ts
├── main.ts
└── users
    ├── user.controller.ts
    └── user.module.ts
```

**Hoạt động theo mô hình module như sau:**

<img src="https://github.com/CUNGVANTHANG/Back-end/assets/96326479/6985472a-6bc6-465d-967f-65e11dce9e73" height="300px">

```ts
// main.ts - Khởi động chương trình tại đây (hàm main)
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = 3333;
  // Lắng nghe port = 3333
  await app.listen(PORT, () => {
    console.log(`App start with port ${PORT}`);
  });
}

bootstrap();
```

```ts
// app.module.ts - dùng để cấu trúc và tổ chức các module khác trong ứng dụng (chứa các controller, service, và các thành phần khác)
import { Module } from "@nestjs/common";
import { UsersModule } from "./users/user.module";

@Module({
  imports: [UsersModule],
})
export class AppModule {}
```

```ts
// users/user.module.ts 
import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";

@Module({
  controllers: [UserController],
})
export class UsersModule {}
```

```ts
// users/user.controller.ts
import { Controller, Get, Post } from "@nestjs/common";

@Controller("users")
export class UserController {
  @Get()
  getAllUsers() {
    return [
      {
        name: "Thang",
        age: 21,
      },
      {
        name: "Cung",
        age: 21,
      },
    ];
  }

  @Post()
  createUser() {
    return {
      name: "Thang",
      age: 21
    }
  }
}
```

Sau đó thực hiện test API sử dụng Postman

![image](https://github.com/CUNGVANTHANG/Back-end/assets/96326479/16db4ec3-5b71-4e2e-9e5f-fe2c914d95f3)

Kết quả cho thấy đúng như kỳ vọng

![image](https://github.com/CUNGVANTHANG/Back-end/assets/96326479/5138dec8-5129-4cc9-a799-99dc88e32b16)

### 3. Pipes

![image](https://github.com/CUNGVANTHANG/Back-end/assets/96326479/ceb0c3a8-7009-409b-9c82-849136b80260)

Client gửi request lên, trước khi tới controller xử lý phải qua **Pipe** có thể thực hiện:

- **transformation**: chuyển đổi dữ liệu đầu vào thành dạng mong muốn (ví dụ, từ chuỗi sang số nguyên)
- **validation**: đánh giá dữ liệu đầu vào và nếu hợp lệ, chỉ cần truyền nó qua mà không thay đổi; nếu không, hãy đưa ra ngoại lệ

Chúng ta hiểu đơn giản là đây là chức năng validate và transform dữ liệu ở phía back-end. Tại sao back-end lại cần validate và transform? Tại vì nếu không thực hiện rất dễ có thể bị hacker thay đổi dữ liệu bằng 1 cách nào đó rồi gửi về phía back-end (mà back-end chỉ lưu dữ liệu mà không validate với transform) thì ứng dụng của ta có thể bị sập.

_Ví dụ:_

**Cấu trúc thư mục**

```
src
├── app.module.ts
├── main.ts
├── user.dto.ts
└── users
    ├── user.controller.ts
    └── user.module.ts
```

```ts
// main.ts
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = 3333;
  await app.listen(PORT, () => {
    console.log(`App start with port ${PORT}`);
  });
}

bootstrap();
```

```ts
// app.module.ts
import { Module } from '@nestjs/common';
import { UserModule } from './users/user.module';

@Module({
  imports: [UserModule],
})
export class AppModule {}
```

```ts
// user.dto.ts - Định dạng kiểu dữ liệu người dùng gửi lên
export class UserDto { 
    username: string;
    password: string;
}
```

```ts
// users/user.controller.ts
import { Param, Body, Controller, Get, Post } from '@nestjs/common';
import { UserDto } from '../user.dto';

@Controller('users')
export class UserController {
    @Post() // Gửi dữ liệu từ body
    createUser(@Body() user: UserDto): UserDto {
        return {
            username: 'test',
            password: 'test',
        }
    }

    @Get(":id")
    getUserById(@Param("id") id: number) {
        return 'text';
    }

}
```

```ts
// users/user.module.ts
import { Module } from "@nestjs/common"
import { UserController } from "./user.controller"

@Module({
  controllers: [UserController]
})
export class UserModule {}
```

**Hướng dẫn:**

**1. Khi ta chưa validate sẽ xảy ra như sau**:

```ts
// users/user.controller.ts
@Get(":id")
getUserById(@Param("id") id: number) {
  return 'text';
}
```

Ta sử dụng postman để kiểm tra thì thấy rằng `id` bây giờ là string hay int ... đều sẽ trả về (return) `text`

![image](https://github.com/user-attachments/assets/e2e1a6b7-ca02-47b8-b2ca-85005f73deb3)

![image](https://github.com/user-attachments/assets/d86fc3f5-58d5-4f57-a4f7-9af4ce1d1e3f)

Bây giờ tôi muốn là `id` truyền vào phải là int thì ta sẽ thêm pipe có sẵn do NestJS cung cấp

## Cấp độ Param

- `ParseIntPipe`
- `ParseFloatPipe`
- `ParseBoolPipe`
- `ParseArrayPipe`
- `ParseUUIDPipe`
- `ParseEnumPipe`
- `DefaultValuePipe`
- `ParseFilePipe`

```ts
// users/user.controller.ts
@Get(":id")
getUserById(@Param("id", ParseIntPipe) id: number) {
  return 'text';
}
```

![image](https://github.com/user-attachments/assets/380661ef-a03c-409a-b0af-7dae07e1e04f)

Khi tôi sử dụng `ParseIntPipe` thì sẽ không thể truyền `id` là định dạng ngoài int được.

## Cấp độ Global

- `ValidationPipe` phụ vào 2 package [`class-transformer`](https://github.com/typestack/class-validator) và [`class-validator`](https://github.com/typestack/class-transformer)

**Cách cài đặt**

```
npm i class-transformer
npm i class-validator
```

_Ví dụ:_

Vào trang github của class-validator để tham khảo cách làm:

<img src="https://github.com/user-attachments/assets/4eebf375-f327-4aa1-9858-7184986170cc" height=300px >

