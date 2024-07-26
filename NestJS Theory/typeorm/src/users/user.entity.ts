import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: "user"
})
export class UserEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column({ default: false })
    isActive: boolean
}