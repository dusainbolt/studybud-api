import { Field, ObjectType } from "@nestjs/graphql";
import { StatusOnOff } from "src/models/common.type";

@ObjectType()
export class Topic {
  @Field()
  _id?: string;

  @Field()
  name?: string;

  @Field()
  owner?: string;

  @Field(() => StatusOnOff)
  status?: StatusOnOff;

  @Field()
  createdAt?: Date;

  @Field()
  updatedAt?: Date;
}
