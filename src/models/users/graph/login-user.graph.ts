import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { User } from "../entity/user.entity";

@InputType()
export class LoginUserInput {
  @Field()
  credential: string;

  @Field()
  password: string;
}

@ObjectType()
export class LoginUserOutput {
  @Field()
  user: User;

  @Field()
  token: string;
}
