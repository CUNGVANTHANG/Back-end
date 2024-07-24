## Mục lục

<details>
  <summary>Kiến thức cốt lõi</summary>

- [Cài đặt](#cài-đặt)
- [1. Chạy chương trình đầu tiên](#2-chạy-chương-trình-đầu-tiên)
- [2. Provider](#2-provider)
- [3. Pipes](#3-pipes)

</details>

## I. Kiến thức cốt lõi
### Cài đặt
[:arrow_up: Mục lục](#mục-lục)

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

### 1. Chạy chương trình đầu tiên
[:arrow_up: Mục lục](#mục-lục)

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

### 2. Provider
[:arrow_up: Mục lục](#mục-lục)



### 3. Pipes
[:arrow_up: Mục lục](#mục-lục)

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
        console.log(user); // Ta sẽ thấy khi validate sai sẽ không xuất hiện log này
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

**1. Khi ta chưa validate sẽ xảy ra chuyện gì**:

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

### Cấp độ Param

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

### Cấp độ Controller

- `ValidationPipe` phụ vào 2 package [`class-transformer`](https://github.com/typestack/class-validator) và [`class-validator`](https://github.com/typestack/class-transformer)

**Cách cài đặt**

```
npm i class-transformer
npm i class-validator
```

_Ví dụ:_

Vào trang github của class-validator để tham khảo cách làm:

<img src="https://github.com/user-attachments/assets/4eebf375-f327-4aa1-9858-7184986170cc" height=300px >

Giả dụ tôi muốn `username` và `password` không được bỏ trống thì sẽ làm như sau:

```ts
// user.dto.ts
import { IsNotEmpty } from "class-validator";

export class UserDto { // Kiểu dữ liệu người dùng gửi lên
    @IsNotEmpty()
    username: string;
    
    @IsNotEmpty()
    password: string;
}
```

Kết quả:

<img src="https://github.com/user-attachments/assets/2aa0074a-9881-4512-930d-e4a9254d5328" height="300px" >

### Cấp độ Global

Trong `main.ts` thêm đoạn code sau `app.useGlobalPipes(new ValidationPipe());`

```ts
// main.ts
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = 3333;
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(PORT, () => {
    console.log(`App start with port ${PORT}`);
  });
}

bootstrap();
```

Cách thực hiện sẽ như cấp độ Controller, ta sẽ thêm các **Decorators** vào nơi config dữ liệu mà người dùng sẽ gửi lên 

**2. Khi ta chưa transform thì sẽ xảy ra chuyện gì**

<img src="https://github.com/user-attachments/assets/bf7979a9-63f3-4e24-b809-fa22f6df7c47" height="300px" >

Mặc dù định dạng dữ liệu gửi lên (`username` và `password`) không có `avatar` nhưng vẫn gửi lên được

```ts
// user.dto.ts
import { IsNotEmpty } from "class-validator";

export class UserDto { // Kiểu dữ liệu người dùng gửi lên
    @IsNotEmpty()
    username: string;
    
    @IsNotEmpty()
    password: string;
}
```

Đó là lúc chúng ta cần transform dữ liệu gửi lên (Khi gửi dữ liệu chúng ta thường gửi các trường `id`, `createAt`, `updateAt`) nên chúng ta sẽ tạo ra 1 file giúp ta làm điều cho tất cả các thực thể (entity) khác

Đầu tiên thì ta sẽ đi `@Expose()` các trường dữ liệu và sử dụng `const userReal = plainToClass(UserDto, user, { excludeExtraneousValues: true });` để có thể ngăn chặn các trường dữ liệu khác từ bên ngoài vào

```ts
// users/user.controller.ts
@Post() // Gửi dữ liệu từ body
createUser(@Body() user: UserDto): UserDto {
  const userReal = plainToClass(UserDto, user, { excludeExtraneousValues: true });
  return userReal;
}
```

```ts
// user.dto.ts
import { IsNotEmpty } from "class-validator";
import { Expose } from "class-transformer";

export class UserDto { // Kiểu dữ liệu người dùng gửi lên
    @IsNotEmpty()
    @Expose()
    username: string;
    
    @IsNotEmpty()
    @Expose()
    password: string;
}
```

<img src="https://github.com/user-attachments/assets/4bf5ea31-1b81-4ad4-9b62-ecb47f0b44b1" height="300px" >

Vậy chúng ta đã có thể ngăn chặn được các trường dữ liệu bên ngoài muốn xâm nhập vào. Bây giờ ta muốn thêm các trường mặc định `id`, `createAt`, `updateAt` luôn luôn có bằng cách tạo file `base.dto.ts`

```ts
// common/base.dto.ts
import { Expose } from "class-transformer";

export abstract class BaseDto {
    @Expose()
    id: number;

    @Expose()
    createdAt: Date;

    @Expose()
    updatedAt: Date;
}
```

xong đó sẽ sử dụng kế thừa `extends` ở mỗi bảng dữ liệu

```
// user.dto.ts
import { IsNotEmpty } from "class-validator";
import { BaseDto } from "./common/base.dto";
import { Expose } from "class-transformer";

export class UserDto extends BaseDto { // Kiểu dữ liệu người dùng gửi lên
    @IsNotEmpty()
    @Expose()
    username: string;
    
    @IsNotEmpty()
    @Expose()
    password: string;
}
```

Ta thử tạo thử dữ liệu giả như sau:

```ts
// users/user.controller.ts
@Post() // Gửi dữ liệu từ body
createUser(@Body() user: UserDto): UserDto {
  user.id = 1;
  user.createdAt = new Date();
  user.updatedAt = new Date();
  const userReal = plainToClass(UserDto, user, { excludeExtraneousValues: true });
  return userReal;
}
```

<img src="https://github.com/user-attachments/assets/87b3678d-4910-4c6d-8245-8ad7c5a4a702" height="300px" >

**Một cách tối ưu hơn nữa (có thể xem thêm)**

Ta sẽ dụng generic để viết hàm giúp cho ta đỡ phải viết lặp lại nhiều lần

```ts
// user.dto.ts
import { IsNotEmpty } from "class-validator";
import { BaseDto } from "./common/base.dto";
import { Expose } from "class-transformer";
import { plainToClass } from 'class-transformer';

export class UserDto extends BaseDto { // Kiểu dữ liệu người dùng gửi lên
    @IsNotEmpty()
    @Expose()
    username: string;
    
    @IsNotEmpty()
    @Expose()
    password: string;
    
    static plainToInstance<T>(this: new (...args: any[]) => T, obj: T) : T {
        return plainToClass(this, obj, { excludeExtraneousValues: true });
    }
}
```

```ts
// users/user.controller.ts
@Post() // Gửi dữ liệu từ body
createUser(@Body() user: UserDto): UserDto {
  user.id = 1;
  user.createdAt = new Date();
  user.updatedAt = new Date();
  return UserDto.plainToInstance(user);
}
```

Kết quả vẫn sẽ như vậy, nhưng code sẽ gọn hơn...

