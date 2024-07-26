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