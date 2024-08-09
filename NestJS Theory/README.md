## Mục lục

<details>
  <summary>Kiến thức cốt lõi</summary>

- [Cài đặt](#cài-đặt)
- [1. Cấu trúc dự án](#1-cấu-trúc-dự-án)
- [2. Controller](#2-controller)
- [3. Module](#3-module)
- [4. MVC](#4-mvc)
- [5. Connect Database](#5-connect-database)
  - [5.1. MongoDB](#51-mongodb)
  - [5.2. MySQL](#52-mysql)
- [6. ENV Variables](#6-env-variables)
- [7. Restful API](#7-restful-api)

</details>

<details>
  <summary>Kiến thức thực hành</summary>

- [1. Chạy chương trình đầu tiên](#2-chạy-chương-trình-đầu-tiên)
- [2. Pipes](#2-pipes)
- [3. Provider](#3-provider)
- [4. TypeORM](#4-typeorm)

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

### 1. Cấu trúc dự án
[:arrow_up: Mục lục](#mục-lục)

**Cấu trúc thư mục:**

<img src="https://github.com/user-attachments/assets/9f18544b-1a75-4b29-941a-e4cb4674e98e" width="200px">

- Thư mục dist: thư mục build của Nest.js

- Thư mục test: viết code test

- `.eslintrc.js` : config eslint, giúp check code khi viết theo cú pháp typescript

- `.gitignore` : khai báo các file không muốn git quản lý

- `.prettierrc` : config prettier, giúp viết code "đẹp hơn"

- `nest-cli.json` : config Nest.js khi chạy CLI/build

- `tsconfig.json` : khai báo cách dịch code typescript thành javascript (môi trường development)

- `tsconfig.build.json` : khai báo cách dịch code typescript thành javascript (khi build với môi trường production)

- `package.json`/`package-lock.json` : quản lý các thư viện cài đặt cho dự án

**Kiến trúc:**

<img src="https://github.com/user-attachments/assets/eb4c814c-24b5-4cf7-9f58-e1394ae2bc0b" width="500px">

### 2. Controller
[:arrow_up: Mục lục](#mục-lục)

**Mô hình Router:**

<img src="https://github.com/user-attachments/assets/5a0881c9-7dc7-4be8-949b-f5883aebbb36" width="500px">

Bản chất của website, là xoay quanh URL (đường link user truy cập). Ở phía backend, URL chính là routes.

_Ví dụ 1:_

```ts
import { Controller, Get, Delete } from '@nestjs/common';

@Controller('user')
export class UserController {
  @Get()
  findAll(): string {
    return 'This action returns all users';
  }
  @Delete('/by-id')
  findById(): string {
    return 'This action will delete a user by id';
  }
}
```

Khi khai báo `@Controller('user')` => Nest sẽ hiểu là `"/user"`

`@Get()` => không có tham số đính kèm => ứng với route `"/"`

=> cộng gộp sẽ ra `GET "/user"`

_Ví dụ 2:_

```ts
@Controller()
@Get('/user) // => sinh ra route "/user"
```

```ts
@Controller("user1")
@Get('/filter-by-name) // => sinh ra route "/user1/filter-by-name"
```

### 3. Module
[:arrow_up: Mục lục](#mục-lục)

**1. Inversion of Control (IoC)**

_Ví dụ:_ Vấn đề hay gặp (minh họa)

```java
public class B {
    public SomeMethod() {
        //doing something..
    }
}
```

```java
public class A {
    B b;

    public A() {
        b = new B();
    }

    public void Task1() {
        // do something here..
        b.SomeMethod();
        // do something here..
    }
}
```

Ta có thể thấy A phụ thuộc vào B. Điều này ảnh hưởng rất nhiều đến với dự án thương mại. Khi mà có nhiều class, và nhiều class bị phụ thuộc lẫn nhau dẫn đến khó kiểm soát và không thể test được. Vì vậy khái niệm IoC ra đời để giải quyết bài toán này. IoC là một kỹ thuật trong lập trình có thể "giảm thiểu" sự phụ thuộc giữa các class với nhau.

Vậy thì làm như thế nào? Chúng ta sẽ sử dụng các pattern: Factory, Dependencies Injections...

**2. Dependencies Injection (DI)**

DI gồm 3 thành phần chính: consumer, provider và injector

<img src="https://github.com/user-attachments/assets/dd81d337-50df-433d-9d9a-2a3db20558f9" width="300px">

Sử dụng decorator: `@Injectable()`

**Về scope:**
- Nếu inject vào 1 modules cụ thể => chỉ có mình modules đấy sử dụng.
- Nếu inject vào root modules => tất cả có thể dùng

Có **3 level** của DI:
- Constructor Injection
- Property Injection
- Method Injection

**Constructor Injection:**

- Cách viết đầy đủ:

```ts
@Controller('cats')
export class CatsController {
    private catsService: CatsService;

    constructor(service: CatsService) {
        this.catsService = service;
    }
}
```

- Cách viết rút gọn:

```ts
@Controller('cats')
export class CatsController {
    constructor(private catsService: CatsService) {}
}
```

**3. Module**

Khi bạn phát triển ứng dụng nhỏ, chúng ta có thể code "all-in-one" (tất cả code trong 1 file/1 thư mục/1 project). Với dự án lớn, chúng ta không thể làm vậy, vì không thể đọc code (code quá nhiều), không thể test/maintain

Giải pháp đặt ra là chia dự án thành các modules. 1 modules có thể là 1 tính năng hoặc 1 nhóm tính năng có liên quan tới nhau

Ưu điểm lớn nhất của cách làm này:

- sự phát triển các modules có thể làm độc lập
- on/off modules này không làm ảnh hưởng tới modules kia (nếu các modules không phụ thuộc vào nhau)

### 4. MVC
[:arrow_up: Mục lục](#mục-lục)

**1. Template View Engine**

Chúng ta có thể sử dụng thư viện EJS, Handlebars hoặc Pug để thực hiện

_Ví dụ:_ Sử dụng thư viện EJS

_Cài đặt:_

```
npm i --save-exact ejs@3.1.9
yarn add ejs@3.1.9
```

```
nest new [project_name]
```

Để có thể sử dụng ta thêm đoạn code sau `app.useStaticAssets()`, `app.setBaseViewsDir()` và ` app.setViewEngine()` vào chương trình đồng thời phải thêm kiểu generic cho `NestFactory.create(AppModule)` thành `NestFactory.create<NestExpressApplication>(AppModule)`

```ts
// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'public')); // js, css, images
  app.setBaseViewsDir(join(__dirname, '..', 'views')); // view
  app.setViewEngine('ejs');
  
  await app.listen(3000);
}
bootstrap();
```

_Cấu trúc thư mục:_

```
public
views
   └── home.ejs
src
   ├── app.module.ts
   ├── app.controller.ts
   ├── app.service.ts
   └── main.ts
   
```

Ta có file `home.ejs`

```ejs
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>Hello World</h1>
</body>
</html>
```

Để có thể render html từ `home.ejs` ta sử dụng decorator `@Render([.ejs file_name])`

```ts
// app.controller.ts
import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('home')
  getHello() {}
}
```

_Kết quả:_

<img src="https://github.com/user-attachments/assets/bf526c49-2e27-4e7d-bba8-be97e66c8a14" width="200px" >

Để có thể `return` ra logic xử lý lên giao diện ta làm như sau:

```ts
// app.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getName(): string {
    return 'Hello World!';
  }
}
```

Ta sử dụng `this.appService.getName()` để có thể gọi hàm `getName()` do phía bên service xử lý.

```ts
// app.controller.ts
import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('home')
  getHello() {
    return { name: this.appService.getName() };
  }
}
```

_Kết quả:_

<img src="https://github.com/user-attachments/assets/5f1d267d-f1a8-4803-b625-835698044100" width="200px" >

### 5. Connect Database
[:arrow_up: Mục lục](#mục-lục)

#### 5.1. MongoDB
[:arrow_up: Mục lục](#mục-lục)

Tham khảo tại: https://docs.nestjs.com/techniques/mongodb

_Cài đặt:_ Có `@9.2.2` hay `@7.1.1` là sử dụng phiên bản, nếu không có sẽ tự động tải phiên bản mới nhất

```
npm install --save-exact @nestjs/mongoose@9.2.2 mongoose@7.1.1
```

Có 2 cách để cài đặt và sử dụng MongoDB:

1. Thông qua Docker
2. Thông qua MongoDB Server (https://cloud.mongodb.com/)

Ta cần import vào `app.module.ts` thì sẽ sử dụng được tất cả ở các module khác

```ts
// app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://mobigame2k3:fgkpixVnAVEjpX59@cluster0.x5cc3dy.mongodb.net/',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

### 6. ENV Variables
[:arrow_up: Mục lục](#mục-lục)

- **Đối với dự án bé:**

_Cài đặt:_ `@16.0.3` là lựa chọn phiên bản, nếu không lựa chọn nó sẽ tự động tải phiên bản mới nhất

```
npm install dotenv@16.0.3
```

Trong file `main.ts` chúng ta cần thêm

```ts
require('dotenv').config();
```

Tạo file `.env` ở level root, và để truy cập 1 biến, chúng ta sử dụng cú pháp:

```
process.env.VARIABLE_NAME
```

_Ví dụ:_

```ts
// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
require('dotenv').config();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'public')); // js, css, images
  app.setBaseViewsDir(join(__dirname, '..', 'views')); // view
  app.setViewEngine('ejs');

  await app.listen(process.env.PORT);
}
bootstrap();
```

- **Đối với dự án lớn**

Giải thích: Trong 1 dự án lớn, đôi khi chúng ta cần: Nhiều hơn 1 file `.env`, ví dụ mỗi môi trường sử dụng là 1 file `.env`

1. Môi trường test: `.env.test`
2. Môi trường development: `.env.development`
3. Môi trường uat: `.env.uat`
4. Môi trường production: `.env.production`

Chúng ta muốn validate dữ liệu của biến trong `.env` . Cách làm truyền thống, sử dụng trực tiếp `.env` là không làm được

Tham khảo tại: https://docs.nestjs.com/techniques/configuration

_Cài đặt:_ `@2.3.1` là lựa chọn phiên bản, nếu không lựa chọn nó sẽ tự động tải phiên bản mới nhất

```
npm i --save-exact @nestjs/config@2.3.1
yarn add @nestjs/config@2.3.1
```

Về bản chất, Config Service cũng sử dụng thư viện `.env`, tuy nhiên, nó đã "code thêm" để giải quyết 2 vấn đề chúng ta nêu ở trên (sử dụng nhiều file `.env` và validate file `.env`)

Sau đó cần thêm vào `app.module.ts` để có thể sử dụng ở mọi module

```ts
ConfigModule.forRoot({
      isGlobal: true,
}),
```

_Ví dụ:_

```ts
// app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://mobigame2k3:fgkpixVnAVEjpX59@cluster0.x5cc3dy.mongodb.net/',
    ),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

Cách sử dụng variable, đối với file `.controller.ts` ta làm như sau: Đầu tiên ta cần khởi tạo `private configService: ConfigService` trong contructor, tiếp theo để sử dụng được ta sử dụng từ khóa `this` như sau `this.configService.get<string>('PORT')`

```env
PORT=3000
```

```ts
// app.controller.ts
import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private configService: ConfigService,
  ) {}

  @Get()
  @Render('home')
  getHello() {
    console.log('PORT:', this.configService.get<string>('PORT')); // PORT:  3000
    return { name: this.appService.getName() };
  }
}
```

Cách sử dụng variable, đối với file `main.ts` ta làm như sau: Ta cần khai báo `const configService = app.get(ConfigService);` và sử dụng `configService.get<string>('PORT')` để lấy ra

```ts
// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);
  app.useStaticAssets(join(__dirname, '..', 'public')); // js, css, images
  app.setBaseViewsDir(join(__dirname, '..', 'views')); // view
  app.setViewEngine('ejs');

  await app.listen(configService.get<string>('PORT'));
}
bootstrap();
```

Vậy sử dụng trong `.module.ts` thì làm thế nào?

Tham khảo thêm tại: https://docs.nestjs.com/techniques/mongodb#async-configuration

Ta cần thêm đoạn code sau:

```ts
MongooseModule.forRootAsync({
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => ({
    uri: configService.get<string>('MONGODB_URI'),
  }),
  inject: [ConfigService],
})
```

_Ví dụ:_

```env
PORT=6969
MONGODB_URI="mongodb+srv://mobigame2k3:fgkpixVnAVEjpX59@cluster0.x5cc3dy.mongodb.net/"
```

```ts
// app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

### 7. Restful API
[:arrow_up: Mục lục](#mục-lục)



### 7.1. Config
[:arrow_up: Mục lục](#mục-lục)

Đầu tiên về generate resources:

Tham khảo tại: https://docs.nestjs.com/recipes/crud-generator

Ta sử dụng câu lệnh:

```
nest g resource users --no-spec
```

Kết quả:

![image](https://github.com/user-attachments/assets/487c2e11-56c2-4f55-976b-b175b6af42d6)

Tiếp theo chúng ta cần chú ý cách đặt tên và thư mục dự án SQL và NoSQL

| SQL | NoSQL |
|:--: | :--: | 
| ![image](https://github.com/user-attachments/assets/b27149fa-9824-4b3d-beac-126706d0b89b) | ![image](https://github.com/user-attachments/assets/c8ec26cd-e083-4259-ba15-ff53b821dad2)
 |

### 7.2. Model
[:arrow_up: Mục lục](#mục-lục)

Ta làm như sau: `@Prop()` chỉ đây là thuộc tính, `required: true` nghĩa là trường này bắt buộc phải nhập

```ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: number;

  @Prop()
  name: string;

  @Prop()
  phone: string;

  @Prop()
  age: number;

  @Prop()
  address: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
```
























































































## II. Kiến thức thực hành
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

### 2. Pipes
[:arrow_up: Mục lục](#mục-lục)

<img src="https://github.com/CUNGVANTHANG/Back-end/assets/96326479/ceb0c3a8-7009-409b-9c82-849136b80260" height="200px">

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
└── users
    ├── user.controller.ts
    └── user.module.ts
    └── user.dto.ts
```

`.dto` **có nghĩa là Data Transfer Object**

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
// users/user.dto.ts - Định dạng kiểu dữ liệu người dùng gửi lên
export class UserDto { 
    username: string;
    password: string;
}
```

```ts
// users/user.controller.ts
import { Param, Body, Controller, Get, Post } from '@nestjs/common';
import { UserDto } from './user.dto';

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
// users/user.dto.ts
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
// users/user.dto.ts
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
// users/user.dto.ts
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
// users/user.dto.ts
import { IsNotEmpty } from "class-validator";
import { BaseDto } from "../common/base.dto";
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
// users/user.dto.ts
import { IsNotEmpty } from "class-validator";
import { BaseDto } from "../common/base.dto";
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

### 3. Provider
[:arrow_up: Mục lục](#mục-lục)

Đầu tiên chúng ta cần hiểu mô hình hoạt động Dependency injection (hiểu đơn giản là cho tất cả vào container và lấy ra từ container)

<img src="https://github.com/user-attachments/assets/6067c418-3946-4f8e-b1c6-ade5f95394d4" height="200px">

Chúng ta có demo sau đây để ta có thể hiểu được:

_Ví dụ 1:_

```ts
class UserService {
	hello(): void {
		console.log("hello");
	}
}

class UserRepository {
	test(): void {
		console.log("test");
	}
}

class Injector {
	private _container = new Map();

	constructor(private _providers: any[] = []) {
		this._providers.forEach(service => this._container.set(service, new service()));
	}

	get(serviceKey: any) {
		const serviceInstance = this._container.get(serviceKey);
		if (!serviceInstance) {
			throw Error("No provider not found");
		}
		return serviceInstance;
	}
}

const inject = new Injector([UserService, UserRepository]);
const userService = inject.get(UserService);
userService.hello(); // hello 
const repo = inject.get(UserRepository);
repo.test(); // test
```

Chú ý phần sau ta có thể thấy:

```ts
const inject = new Injector([UserService, UserRepository]);
const userService = inject.get(UserService);
userService.hello(); // hello 
const repo = inject.get(UserRepository);
repo.test(); // test
```

Ta đang lấy từ `container` thông qua phương thức `get`, điều này giúp ta dễ dàng quản lý khi mà dự án lớn. Mỗi module đều có một injector riêng

_Ví dụ 2:_ Kế tiếp từ ví dụ ta thực hiện trên [phần 2 pipes](#cấp-độ-global)

**Cấu trúc thư mục**

```
src
├── app.module.ts
├── main.ts
└── users
    ├── user.controller.ts
    └── user.module.ts
    └── user.dto.ts
    └── user.service.ts
```

`.dto` **có nghĩa là Data Transfer Object**

```ts
// users/user.module.ts
import { Module } from "@nestjs/common"
import { UserController } from "./user.controller"

@Module({
  controllers: [UserController]
})
export class UserModule {}
```

```ts
// users/user.controller.ts
import { Param, Body, Controller, Get, Post, ParseIntPipe } from '@nestjs/common';
import { UserDto } from './user.dto';

@Controller('users')
export class UserController {
    @Post() // Gửi dữ liệu từ body
    createUser(@Body() user: UserDto): UserDto {
        user.id = 1;
        user.createdAt = new Date();
        user.updatedAt = new Date();
        return UserDto.plainToInstance(user);
    }

    @Get(":id")
    getUserById(@Param("id", ParseIntPipe) id: number) {
        return 'text';
    }
}
```

<img src="https://github.com/user-attachments/assets/87b3678d-4910-4c6d-8245-8ad7c5a4a702" height="300px" >

Chúng ta có thể thấy chúng ta đang fix cứng code, khi có sự thay đổi ta sẽ phải tìm khá lâu (bản chất controller có tác dụng là nhập dữ liệu đầu vào và trả dữ liệu đầu ra)

```ts
user.id = 1;
user.createdAt = new Date();
user.updatedAt = new Date();
```

Nơi xử lý dữ liệu (service) ta sẽ tạo 1 file `user.service.ts`

```ts
// users/user.service.ts
import { UserDto } from "./user.dto";

export class UserService {
    createUser(user: any): any {
        user.id = 1;
        user.createdAt = new Date();
        user.updatedAt = new Date();
        return UserDto.plainToInstance(user);
    }
}
```

Tiếp tục để có thể sử dụng được `UserSevice` ta phải cấp `provider: [UserSevice]` cho `user.module.ts` (**Nơi cung cấp**)

```ts
import { Module } from "@nestjs/common"
import { UserController } from "./user.controller"
import { UserService } from "./user.service"

@Module({
  controllers: [UserController],
  providers: [UserService] // Nơi cung cấp
})
export class UserModule {}
```

Khi đó ta phải thay đổi code trong `users/user.controller.ts` (**Nơi lấy ra**). Ta có 2 cách để làm

**Cách 1:** Sử dụng `ModuleRef` do NestJS cung cấp để lấy ra

```ts
// users/user.controller.ts
import { Param, Body, Controller, Get, Post, ParseIntPipe } from '@nestjs/common';
import { UserDto } from './user.dto';
import { ModuleRef } from '@nestjs/core';
import { UserService } from './user.service';

@Controller('users')
export class UserController {

    constructor(private moduleRef: ModuleRef) {}

    @Post() // Gửi dữ liệu từ body
    createUser(@Body() user: UserDto): UserDto {
        const userService = this.moduleRef.get(UserService);
        return userService.createUser(user);
    }

    @Get(":id")
    getUserById(@Param("id", ParseIntPipe) id: number) {
        return 'text';
    }
}
```

**Cách 2:** Trực tiếp lấy ra

```ts
import { Param, Body, Controller, Get, Post, ParseIntPipe } from '@nestjs/common';
import { UserDto } from './user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {

    constructor(private readonly userSevice: UserService) {}

    @Post() // Gửi dữ liệu từ body
    createUser(@Body() user: UserDto): UserDto {
        return this.userSevice.createUser(user);
    }

    @Get(":id")
    getUserById(@Param("id", ParseIntPipe) id: number) {
        return 'text';
    }
}
```

**Chú ý:** Trong trường hợp có các provider tên giống nhau thì ta cần phân biệt bằng cách **`key`**, mặc định khi ta chưa thay đổi thì `key` của provider sẽ là tên class đó

```ts
providers: [{
    provide: UserService,
    useClass: UserService
  }] 
```

Ta có thể thay đổi thành như sau:

```ts
import { Module } from "@nestjs/common"
import { UserController } from "./user.controller"
import { UserService } from "./user.service"

@Module({
  controllers: [UserController],
  providers: [{
    provide: "USER_SERVICE",
    useClass: UserService
  }] 
})
export class UserModule {}
```

Khi đó ta phải thay đổi code trong `users/user.controller.ts` (**Nơi lấy ra**). Ta có 2 cách để làm

**Cách 1:** Sử dụng `ModuleRef` của NestJS cung cấp cho

```ts
// users/user.controller.ts
import { Param, Body, Controller, Get, Post, ParseIntPipe } from '@nestjs/common';
import { UserDto } from './user.dto';
import { ModuleRef } from '@nestjs/core';

@Controller('users')
export class UserController {

    constructor(private moduleRef: ModuleRef) {}

    @Post() // Gửi dữ liệu từ body
    createUser(@Body() user: UserDto): UserDto {
        return this.moduleRef.get("USER_SERVICE").createUser(user);
    }

    @Get(":id")
    getUserById(@Param("id", ParseIntPipe) id: number) {
        return 'text';
    }
}
```

**Cách 2:** Lấy ra trực tiếp

```ts
import { Param, Body, Controller, Get, Post, ParseIntPipe, Inject } from '@nestjs/common';
import { UserDto } from './user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {

    constructor(@Inject("USER_SERVICE") private readonly userService: UserService) {}

    @Post() // Gửi dữ liệu từ body
    createUser(@Body() user: UserDto): UserDto {
        return this.userService.createUser(user);
    }

    @Get(":id")
    getUserById(@Param("id", ParseIntPipe) id: number) {
        return 'text';
    }
}
```

### 4. TypeORM
[:arrow_up: Mục lục](#mục-lục)

![image](https://github.com/user-attachments/assets/1e04549c-c4db-4fab-878b-728de2b707c2)

**Cài đặt:**

```
npm install --save @nestjs/typeorm typeorm mysql2
```

```
src
├── app.module.ts
├── main.ts
└── users
    ├── user.controller.ts
    └── user.module.ts
    └── user.dto.ts
    └── user.service.ts
    └── user.entity.ts
```

`.dto` **có nghĩa là Data Transfer Object**

### Config connect

Sau khi quá trình cài đặt hoàn tất, chúng ta có thể nhập `TypeOrmModule` vào thư mục gốc `AppModule`.

```ts
// app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3309,
      username: 'root',
      password: 'root',
      database: 'test',
      entities: [],
      synchronize: true, // production sẽ phải đổi thành false
    }),
  ],
})
export class AppModule {}
```

```ts
// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3333);
}
bootstrap();
```

**Config docker**

Tạo file `docker-compose.yml` để run service. Tạo thư mục `data/mysql` để lưu trữ dữ liệu

![image](https://github.com/user-attachments/assets/04e9579f-7fb7-4674-9f75-cd567ecca039)

```yml
version: "3.9"
services:
  my-sql:
    image: mysql:8.0
    ports:
      - "3309:3306"
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: datasql
      MYSQL_USER: typeorm
      MYSQL_PASSWORD: typeorm
    volumes:
      - ./data/mysql:/var/lib/mysql
```

Trong đó có `volumes` giúp chúng ta lưu dữ liệu tại ổ đĩa, thay vì lưu vào container vì mỗi khi restart container sẽ bị mất đi

**Run docker**

```
docker-compose up -d
```

**Kết nối cơ sở dữ liệu**

Chúng ta có thể sử dụng `dbeaver` để kết nối tới cổng **3309** với tài khoản là **root**, mật khẩu là **root**

![image](https://github.com/user-attachments/assets/95768b62-64ef-4497-b231-1517bcfb5ab4)

**Tạo thư mục users để quản lý dữ liệu của người dùng**

![image](https://github.com/user-attachments/assets/81e39373-d25f-4811-9396-d9b7858bd6ed)

```ts
// users/user.module.ts
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./user.entity";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity])
    ],
    controllers: [UserController],
    providers: [UserService],
    
})
export class UserModule {}
```

```ts
// users/user.entity.ts
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: "user" // Đặt tên cho bảng
})
export class UserEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column({ default: false })
    isActive: boolean
}
```

File `.entity` dùng để xác định các trường trong bảng

Tham khảo entity thêm tại đây: https://typeorm.io/entities

Khi thực hiện xong chúng ta sẽ thêm `UserModule` và `UserEntity` vào `app.module.ts` để xem kết quả

```ts
// app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './users/user.module';
import { UserEntity } from './users/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3309,
      username: 'typeorm',
      password: 'typeorm',
      database: 'datasql',
      entities: [UserEntity],
      synchronize: true, // production sẽ phải đổi thành false
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {};
```

```
+-------------+--------------+----------------------------+
|                           user                          |
+-------------+--------------+----------------------------+
| id          | varchar(36)  | PRIMARY KEY AUTO_INCREMENT |
| firstName   | varchar(255) |                            |
| lastName    | varchar(255) |                            |
| isActive    | tinyint      |                            |
+-------------+--------------+----------------------------+
```

![image](https://github.com/user-attachments/assets/54d76627-8046-456a-bb14-e7a55da5db82)

### Thêm, sửa, xóa, lấy dữ liệu vào database

Tiếp theo để có thể thực hiện thêm, sửa, xóa, lấy database ta cần `user.service.ts`, `user.controller.ts` và `user.dto.ts`

```ts
// users/user.controller.ts
import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { UserDto } from "./user.dto";
import { UserService } from "./user.service";

@Controller('users')
export class UserController { // Sẽ tương tác với UserService và làm việc trực tiếp với UserDto
    constructor(private readonly userService : UserService) {}

    @Post()
    createUser(@Body() user: UserDto): Promise<UserDto> {
        return this.userService.add(user);
    }

    @Put(":id")
    updateUser(@Param("id") id: string, @Body() user: UserDto): Promise<{ result: string }> {
        return this.userService.update(id, user);
    }

    @Delete(":id")
    deleteUser(@Param("id") id: string): Promise<{ result: string }> {
        return this.userService.delete(id);
    }

    @Get(":id")
    getUser(@Param("id") id: string): Promise<UserDto> {
        return this.userService.get(id);
    }
}
```

```ts
// users/user.service.ts
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./user.entity";
import { Repository } from "typeorm";
import { UserDto } from "./user.dto";
import { plainToInstance } from "class-transformer";

@Injectable()
export class UserService { // Làm nhiệm vụ tương tác với database
    // Khởi tạo repository
    constructor(
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>
    ) {}

    async add(userDto: UserDto): Promise<UserDto> {
        const savedUser = await this.userRepository.save(userDto);
        return plainToInstance(UserDto, savedUser, { excludeExtraneousValues: true });
    }

    async update(id: string, userDto: UserDto): Promise<{ result: string }> {
        await this.userRepository.update(id, userDto);
        return { result: "success" };
    }

    async delete(id: string): Promise<{ result: string }> {
        await this.userRepository.delete(id);
        return { result: "success" };
    }

    async get(id: string): Promise<UserDto> {
        const foundUser = await this.userRepository.findOne({
            where: {
                id: id
            }
        });
        return plainToInstance(UserDto, foundUser, { excludeExtraneousValues: true });
    }
}
```

```ts
// users/user.dto.ts
import { Expose } from "class-transformer"

export class UserDto {
    @Expose()
    id: string

    @Expose()
    firstName: string

    @Expose()
    lastName: string

    @Expose()
    isActive: boolean
}
```

Sử dụng Postman để gửi dữ liệu 

<img src="https://github.com/user-attachments/assets/6cde2568-5024-4701-be8f-e05dffe39b58" width="400px" >

Sử dụng Postman để lấy dữ liệu

<img src="https://github.com/user-attachments/assets/8cbe8d6f-6173-4a54-93cf-e2816d37701e" width="400px" >
