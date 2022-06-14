import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { HashModule } from "src/hash/hash.module";
import { HttpModule } from "src/http.module";
import { UsersModule } from "../models/users/user.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { FacebookStrategy } from "./facebook.strategy";
import { RolesGuard } from "./roles.guard";

@Module({
  imports: [UsersModule, HttpModule, HashModule],
  providers: [
    AuthService,
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
