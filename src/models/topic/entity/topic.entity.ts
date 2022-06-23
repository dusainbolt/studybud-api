import { Field, Int, ObjectType } from "@nestjs/graphql";
import { StatusOnOff } from "src/models/models.enum";

@ObjectType()
export class Topic {
  @Field()
  _id?: string;

  @Field()
  name?: string;

  @Field()
  owner?: string;

  @Field(() => Int)
  status?: StatusOnOff;

  @Field(() => [String])
  missions?: string[];

  @Field()
  createdAt?: Date;

  @Field()
  updatedAt?: Date;
}
