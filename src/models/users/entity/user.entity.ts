import { Field, ObjectType } from "@nestjs/graphql";
import { JWT } from "./jwt.entity";
import { Gender, Role, SocialType, UserStatus } from "./user.enum";

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
  phone?: string;

  @Field(() => SocialType)
  socialType?: SocialType;

  @Field()
  socialId?: string;

  @Field(() => Gender, { nullable: true })
  gender?: Gender;

  @Field({ nullable: true })
  birthday?: Date;

  @Field(() => [JWT], { nullable: true })
  tokens?: JWT[];

  @Field(() => [Role], { nullable: true })
  roles?: Role[];

  @Field(() => UserStatus, { nullable: true })
  status?: UserStatus;

  @Field({ nullable: true })
  createdAt?: Date;

  @Field({ nullable: true })
  updatedAt?: Date;
}
