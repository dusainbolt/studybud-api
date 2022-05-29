import { Field, InputType } from "@nestjs/graphql";
import { Length } from "class-validator";
import { MSG } from "src/utils/message";

@InputType()
export class UpdateUserInput {
  @Field()
  @Length(1, 18, { message: MSG.validLength })
  username: string;
}
