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