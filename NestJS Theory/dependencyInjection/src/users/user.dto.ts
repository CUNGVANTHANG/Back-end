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