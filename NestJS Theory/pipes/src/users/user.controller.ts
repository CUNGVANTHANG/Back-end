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