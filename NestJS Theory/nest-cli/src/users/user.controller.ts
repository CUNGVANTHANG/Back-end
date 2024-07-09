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
