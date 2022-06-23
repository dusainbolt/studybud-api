import { Field, InputType } from "@nestjs/graphql";
import { IsOptional, MaxLength } from "class-validator";
import { MSG } from "src/utils/message";

@InputType()
export class CreateStudyRequestInput {
  @Field()
  @MaxLength(50, { message: MSG.validLength })
  title: string;

  @Field()
  topic: string;

  @Field()
  mission: string;

  @Field()
  standard: string;

  @Field({ nullable: true })
  @IsOptional()
  point: number;

  @Field({ nullable: true })
  @IsOptional()
  pointValue: string;

  @Field()
  @MaxLength(100, { message: MSG.validLength })
  requestDes: string;

  @Field()
  @MaxLength(50, { message: MSG.validLength })
  missionDes: string;
}

@InputType()
export class UpdateStudyRequestInput extends CreateStudyRequestInput {
  @Field()
  @MaxLength(50, { message: MSG.validLength })
  requestId: string;
}
