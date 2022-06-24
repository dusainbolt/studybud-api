import { Field, Int, ObjectType } from "@nestjs/graphql";
import { StatusOnOff } from "src/models/models.enum";

@ObjectType()
export class Mission {
  @Field()
  _id?: string;

  @Field()
  name?: string;

  @Field()
  topic?: string;

  @Field(() => [String])
  standards?: string[];

  @Field()
  owner?: string;

  @Field(() => Int)
  status?: StatusOnOff;

  @Field()
  createdAt?: Date;

  @Field()
  updatedAt?: Date;
}
