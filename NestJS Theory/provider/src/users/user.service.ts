import { UserDto } from "./user.dto";

export class UserService {
    createUser(user: any): any {
        user.id = 1;
        user.createdAt = new Date();
        user.updatedAt = new Date();
        return UserDto.plainToInstance(user);
    }
}