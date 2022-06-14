import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { HashModule } from "src/hash/hash.module";
import { MailModule } from "src/mail/mail.module";
import { Constant } from "src/utils/constant";
import { AppLogger } from "./../../logs/logs.service";
import { UserSchema } from "./entity/user.schema";
import { UserRepository } from "./user.repository";
import { UserResolver } from "./user.resolver";
import { UserService } from "./user.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Constant.schema.USER, schema: UserSchema },
    ]),
    HashModule,
    MailModule,
  ],
  providers: [UserService, UserRepository, UserResolver, AppLogger],
  exports: [UserRepository],
})
export class UsersModule {}
