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