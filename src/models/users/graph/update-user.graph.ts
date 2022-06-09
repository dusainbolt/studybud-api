import { Field, InputType } from "@nestjs/graphql";
import { IsOptional, Length } from "class-validator";
import { MSG } from "src/utils/message";

@InputType()
export class UpdateUserInput {
  @Field()
  @IsOptional()
  @Length(1, 100, { message: MSG.validLength })
  username: string;

  @Field()
  @IsOptional()
  // @Length(1, 18, { message: MSG.validLength })
  description: string;
}
