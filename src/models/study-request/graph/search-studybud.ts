import { Field, InputType, Int, ObjectType } from "@nestjs/graphql";
import { IsEnum, IsOptional } from "class-validator";
import { Gender } from "src/models/models.enum";
import { User } from "src/models/users/entity/user.entity";
@InputType()
export class SearchStudybudInput {
  @Field({ defaultValue: null })
  topic?: string;

  @Field({ defaultValue: null })
  mission?: string;

  @Field({ defaultValue: null })
  standard?: string;

  @Field(() => [Number], { defaultValue: null })
  point?: number[];

  @Field({ defaultValue: null })
  pointValue?: string;

  @Field({ defaultValue: null })
  @IsOptional()
  @IsEnum(Gender)
  gender: Gender;

  @Field(() => Int, { defaultValue: null })
  offset?: number;

  @Field(() => Int, { defaultValue: null })
  limit?: number;
}

@ObjectType()
export class SearchStudybudOutput {
  @Field()
  user: User;
}
// mission: 62b41947462a53d6a5c8dc03,
// standard: 62b41947462a53d6a5c8dc07,
// topic: 62b41947462a53d6a5c8dc02,
// user: {
//   _id: 62b91d770c4e9f45da42e808,
//   email: 'dulh181199+1@gmail.com',
//   socialType: 2,
//   __v: 0,
//   address: 'Tỉnh Quảng Ninh',
//   avatar: null,
//   birthday: null,
//   contact: 'Consequat Vitae rer',
//   createdAt: 2022-06-27T03:01:11.455Z,
//   description: '3333',
//   firstName: null,
//   gender: 1,
//   lastName: null,
//   name: 'Macon Herman',
//   password: '$2b$10$e80hpVF4vUK.147poTzmD.jm1rUiQsOvW7gE0pOPxv18ss/vPAvcu',
//   phone: null,
//   roles: [Array],
//   school: 'Labore iste in occae',
//   socialId: null,
//   status: 1,
//   tokens: [],
//   updatedAt: 2022-06-27T12:48:04.159Z,
//   username: 'lagota'
// }
// }
