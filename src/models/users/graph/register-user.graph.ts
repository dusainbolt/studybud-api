import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, MinLength } from "class-validator";
import { MSG } from "src/utils/message";

@InputType()
export class RegisterUserInput {
  @Field()
  @MinLength(5, { message: MSG.validLength })
  name: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @MinLength(8, { message: MSG.validLength })
  password: string;
}
