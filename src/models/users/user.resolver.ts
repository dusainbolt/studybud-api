import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Roles } from "src/auth/roles.guard";
import { MailService } from "src/mail/mail.service";
import { Constant } from "src/utils/constant";
import { Helper } from "src/utils/helper";
import { MSG } from "src/utils/message";
import { Role, UserStatus } from "../models.enum";
import { User } from "./entity/user.entity";
import { UserDocument } from "./entity/user.schema";
import { GetUserInput } from "./graph/get-user.graph";
import { LoginUserInput, LoginUserOutput } from "./graph/login-user.graph";
import { RegisterUserInput } from "./graph/register-user.graph";
import { SearchUserInput } from "./graph/search-user.graph";
import { UpdateUserInput } from "./graph/update-user.graph";
import { UserRepository } from "./user.repository";
import { UserService } from "./user.service";
@Resolver(User)
export class UserResolver {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userService: UserService,
    private readonly mailService: MailService
  ) {}

  @Query(() => [User])
  async searchUser(@Args("input") input: SearchUserInput): Promise<User[]> {
    return await this.userRepository.findAll(input);
  }

  @Mutation(() => String)
  async registerUser(@Args("input") input: RegisterUserInput): Promise<String> {
    let user = await this.userService.findUserRegister(input);

    if (user && user.status === UserStatus.ACTIVE) {
      throw Helper.apolloError(MSG.logic.ALREADY_USER);
    } else if (!user || user.status === UserStatus.INACTIVE) {
      user = await this.userService.createUserSystem(input);
    }

    const token = this.userService.signJWTAuth(user, "JWT_EXPIRE_VERIFY");
    await this.mailService.sendUserConfirmation(user, token);

    return user.email;
  }

  @Query(() => User)
  async getUser(@Args("input") input: GetUserInput): Promise<User> {
    const user = await this.userRepository.findOne({
      $or: [{ username: input.credential }, { _id: input.credential }],
    });
    if (!user) {
      throw Helper.apolloError(MSG.logic.INVALID_USER);
    }
    return user;
  }

  @Roles([Role.USER])
  @Mutation(() => Boolean)
  async updateUser(
    @Args("input") input: UpdateUserInput,
    @Context(Constant.context.USER) user: UserDocument
  ): Promise<Boolean> {
    await this.userRepository.updateById(user._id, input);
    return true;
  }

  @Mutation(() => LoginUserOutput)
  async loginUser(
    @Args("input") input: LoginUserInput
  ): Promise<LoginUserOutput> {
    const user = await this.userService.verifyLogin(input);
    const token = await this.userService.signJWTAuth(user);
    return { user, token };
  }

  @Roles([Role.USER])
  @Query(() => User)
  async authUser(
    @Context(Constant.context.USER) user: UserDocument
  ): Promise<UserDocument> {
    return user;
  }
}
