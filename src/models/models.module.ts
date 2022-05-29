import { Module } from "@nestjs/common";
import { HashService } from "src/hash/hash.service";
import { ModelResolver } from "./models.resolver";
import { UsersModule } from "./users/user.module";

@Module({
  imports: [UsersModule],
  providers: [ModelResolver, HashService],
})
export class ModelsModule {}
