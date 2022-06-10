import { Field, InputType } from "@nestjs/graphql";
import { IsEnum, IsOptional, Length } from "class-validator";
import { MSG } from "src/utils/message";
import { Gender } from "../entity/user.enum";

@InputType()
export class UpdateUserInput {
  @Field({ nullable: true })
  @IsOptional()
  @Length(1, 20, { message: MSG.validLength })
  username: string;

  @Field({ nullable: true })
  @IsOptional()
  // @Length(1, 18, { message: MSG.validLength })
  description: string;

  @Field({ nullable: true })
  @IsOptional()
  name: string;

  @Field({ nullable: true })
  @IsOptional()
  school: string;

  @Field({ nullable: true })
  @IsOptional()
  address: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsEnum(Gender)
  gender: Gender;

  @Field({ nullable: true })
  @IsOptional()
  contact: string;
}
