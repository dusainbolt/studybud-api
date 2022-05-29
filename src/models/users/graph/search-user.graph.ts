import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class SearchUserInput {
  @Field({ defaultValue: null })
  key?: string;

  @Field(() => Int, { defaultValue: null })
  offset?: number;

  @Field(() => Int, { defaultValue: null })
  limit?: number;

  @Field(() => Int, { defaultValue: null })
  sortBy?: number;

  @Field({ defaultValue: "" })
  orderBy?: string;

  @Field({ defaultValue: true })
  count?: boolean;
}
