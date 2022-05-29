import { Args, Query, Resolver, Mutation, Context } from "@nestjs/graphql";
import { User } from "./entity/user.entity";
import { SearchUserInput } from "./graph/search-user.graph";
import { UserRepository } from "./user.repository";
import { UpdateUserInput } from "./graph/update-user.graph";
import { Roles, USER_KEY } from "src/auth/roles.guard";
import { UserDocument } from "./entity/user.schema";
import { Role } from "./entity/user.enum";
@Resolver(User)
export class UserResolver {
  constructor(private readonly userRepository: UserRepository) {}

  @Query(() => [User])
  async searchUser(@Args("input") input: SearchUserInput): Promise<User[]> {
    return await this.userRepository.findAll();
  }

  @Roles([Role.USER])
  @Mutation(() => Boolean)
  async updateUser(
    @Args("input") input: UpdateUserInput,
    @Context(USER_KEY) user: UserDocument
  ): Promise<Boolean> {
    await this.userRepository.updateById(user._id, input);
    return true;
  }
  // @Mutation(() => LoginOutput)
  // async loginUser(@Args("input") input: LoginInput): Promise<LoginOutput> {
  //   // Check is exist user
  //   let user = await this.userService.findOne({
  //     $or: [{ username: input.credential }, { email: input.credential }],
  //   });
  //   if (!user) {
  //     throw Helper.apolloError(MSG.logic.INVALID_USER);
  //   }
  //   return { user, token: "EXAMPLE" };
  // }

  // @Query(() => [UserSkillData])
  // async userSkills(
  //   @Args("input") input: FindUserInput
  // ): Promise<UserSkillData[]> {
  //   return this.userService.listSkill(input);
  // }

  // @Roles([Role.ADMIN])
  // @Mutation(() => Boolean)
  // async userAddSkill(
  //   @Args("input") input: UserSkill,
  //   @Context(USER_KEY) user: UserDocument
  // ): Promise<Boolean> {
  //   return this.userService.addSkill([input], user);
  // }

  // @Roles([Role.ADMIN])
  // @Mutation(() => Boolean)
  // async userUpdateSkill(
  //   @Args("input") input: UpdateUserSkill,
  //   @Context(USER_KEY) user: UserDocument
  // ): Promise<Boolean> {
  //   return this.userService.updateSkill(input.data, user);
  // }
}
