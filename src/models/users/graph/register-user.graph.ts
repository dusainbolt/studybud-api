import { Field, InputType } from "@nestjs/graphql";
import { IsAlphanumeric, IsEmail, Length, MinLength } from "class-validator";
import { MSG } from "src/utils/message";

@InputType()
export class RegisterUserInput {
  @Field()
  @Length(5, 39, { message: MSG.validLength })
  name: string;

  @Field()
  @Length(5, 39, { message: MSG.validLength })
  @IsAlphanumeric()
  username: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @MinLength(8, { message: MSG.validLength })
  password: string;
}
