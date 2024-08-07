import { Injectable } from "@nestjs/common";
import { UserDto } from "./user.dto";
import { plainToInstance } from "class-transformer";

@Injectable()
export class UserService {
    create(user): UserDto {
        return plainToInstance(UserDto, user);
    }
}