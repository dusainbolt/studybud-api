import { Field, Int, ObjectType } from "@nestjs/graphql";
import { JWT } from "./jwt.entity";
import { Gender, Role, SocialType, UserStatus } from "src/models/models.enum";

@ObjectType()
export class User {
  @Field()
  _id?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  username?: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field({ nullable: true })
  avatar?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  school?: string;

  @Field({ nullable: true })
  address?: string;

  @Field({ nullable: true })
  phone?: string;

  @Field({ nullable: true })
  password?: string;

  @Field({ nullable: true })
  contact?: string;

  @Field(() => Int)
  socialType?: SocialType;

  @Field()
  socialId?: string;

  @Field(() => Int, { nullable: true })
  gender?: Gender;

  @Field({ nullable: true })
  birthday?: Date;

  @Field(() => [JWT], { nullable: true })
  tokens?: JWT[];

  @Field(() => [Int], { nullable: true })
  roles?: Role[];

  @Field(() => Int, { nullable: true })
  status?: UserStatus;

  @Field({ nullable: true })
  createdAt?: Date;

  @Field({ nullable: true })
  updatedAt?: Date;
}
