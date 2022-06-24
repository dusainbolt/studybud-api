import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { HashService } from "src/hash/hash.service";
import { Helper } from "src/utils/helper";
import { MSG } from "src/utils/message";
import { JWTData } from "./dto/jwt-data.dto";
import { User } from "./entity/user.entity";
import { Role, SocialType, UserStatus } from "src/models/models.enum";
import { UserDocument } from "./entity/user.schema";
import { LoginUserInput } from "./graph/login-user.graph";
import { RegisterUserInput } from "./graph/register-user.graph";
import { UserRepository } from "./user.repository";

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashService: HashService,
    private readonly config: ConfigService
  ) {}

  async findUserRegister(input: RegisterUserInput): Promise<UserDocument> {
    return await this.userRepository.findOne({
      email: input.email,
      socialType: SocialType.SYSTEM,
    });
  }

  async verifyLogin(input: LoginUserInput): Promise<UserDocument> {
    const user = await this.userRepository.findOne({
      $or: [{ username: input.credential }, { email: input.credential }],
      status: UserStatus.ACTIVE,
    });

    if (!user) {
      throw Helper.apolloError(MSG.logic.INVALID_USER);
    }

    const isMatchPassword = await this.hashService.matchBcrypt(
      input.password,
      user.password
    );

    if (!isMatchPassword) {
      throw Helper.apolloError(MSG.logic.NOT_CORRECT_PASSWORD);
    }
    return user;
  }

  async createUserSystem(input: RegisterUserInput): Promise<UserDocument> {
    const password = await this.hashService.hashBcrypt(input.password);
    const createData: User = {
      ...input,
      password,
      socialType: SocialType.SYSTEM,
      roles: [Role.USER],
    };
    return await this.userRepository.atomicInsert(
      {
        email: input.email,
        socialType: SocialType.SYSTEM,
      },
      createData
    );
  }

  signJWTAuth(user: User, keyExp = "JWT_EXPIRE") {
    return this.hashService.signJWT(
      {
        username: user.username,
        email: user.email,
        id: user._id,
        roles: user.roles,
      } as JWTData,
      this.config.get(keyExp)
    );
  }
}
