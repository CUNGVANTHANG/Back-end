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