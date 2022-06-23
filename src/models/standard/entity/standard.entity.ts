import { Field, Int, ObjectType } from "@nestjs/graphql";
import { StatusOnOff, PointStandard } from "src/models/models.enum";

@ObjectType()
export class Standard {
  @Field()
  _id?: string;

  @Field()
  name?: string;

  @Field()
  mission?: string;

  @Field()
  owner?: string;

  @Field()
  point?: number;

  @Field(() => [String])
  pointData?: Array<any>;

  @Field(() => Int)
  pointType?: PointStandard;

  @Field(() => Int)
  status?: StatusOnOff;

  @Field()
  createdAt?: Date;

  @Field()
  updatedAt?: Date;
}
