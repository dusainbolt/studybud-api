import { Field, Int, ObjectType } from "@nestjs/graphql";
import { StatusOnOff } from "src/models/models.enum";

@ObjectType()
export class StudyRequest {
  @Field()
  _id?: string;

  @Field()
  title?: string;

  @Field()
  topic?: string;

  @Field()
  mission?: string;

  @Field()
  standard?: string;

  @Field()
  owner?: string;

  @Field({ nullable: true })
  point?: number;

  @Field({ nullable: true })
  pointValue?: string;

  @Field({ nullable: true })
  requestDes?: string;

  @Field({ nullable: true })
  missionDes?: string;

  @Field(() => Int)
  status?: StatusOnOff;

  @Field()
  createdAt?: Date;

  @Field()
  updatedAt?: Date;
}
