import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class JWT {
  @Field({ nullable: true })
  value: string;

  @Field({ nullable: true })
  exp: Date;

  @Field({ nullable: true })
  createdAt: Date;
}
