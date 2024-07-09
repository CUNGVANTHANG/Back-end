import { Module } from "@nestjs/common";
import { UsersModule } from "./users/user.module";

@Module({
  imports: [UsersModule],
})
export class AppModule {}
