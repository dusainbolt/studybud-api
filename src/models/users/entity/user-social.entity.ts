import { Field, ObjectType } from "@nestjs/graphql";
import { SocialType } from "./user.enum";

@ObjectType()
export class UserSocial {
  @Field({ nullable: true })
  socialId: string;

  @Field({ nullable: true })
  email: string;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  firstName: string;

  @Field({ nullable: true })
  lastName: string;

  @Field({ nullable: true })
  avatar: string;

  @Field(() => SocialType)
  socialType: SocialType;
}
