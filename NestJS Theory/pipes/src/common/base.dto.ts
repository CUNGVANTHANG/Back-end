import { Expose } from "class-transformer";

export abstract class BaseDto {
    @Expose()
    id: number;

    @Expose()
    createdAt: Date;

    @Expose()
    updatedAt: Date;
}