import { RolesGuard } from "./roles.guard";
import { UsersModule } from "../models/users/user.module";
import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { APP_GUARD } from "@nestjs/core";
import { HashService } from "src/hash/hash.service";
import { FacebookStrategy } from "./facebook.strategy";
import { AuthController } from "./auth.controller";
import { HttpModule } from "src/http.module";

@Module({
  imports: [UsersModule, HttpModule],
  providers: [
    AuthService,
    HashService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    FacebookStrategy,
  ],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
