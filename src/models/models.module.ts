import { Module } from "@nestjs/common";
import { ModelResolver } from "./models.resolver";
import { UsersModule } from "./users/user.module";

@Module({
  imports: [UsersModule],
  providers: [ModelResolver],
})
export class ModelsModule {}
