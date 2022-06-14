import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { HashService } from "src/hash/hash.service";
import { Helper } from "src/utils/helper";
import { JWTData } from "./dto/jwt-data.dto";
import { User } from "./entity/user.entity";
import { SocialType } from "./entity/user.enum";
import { UserDocument } from "./entity/user.schema";
import { RegisterUserInput } from "./graph/register-user.graph";
import { UserRepository } from "./user.repository";

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashService: HashService,
    private readonly configService: ConfigService
  ) {}

  async atomicInsert(filter: User, input: User) {
    return await this.userRepository.findOneAndUpdate(
      filter,
      {
        ...filter,
        ...input,
      },
      {
        new: false,
        upsert: true,
      }
    );
  }

  async createUserSystem(input: RegisterUserInput): Promise<UserDocument> {
    const password = await this.hashService.hashBcrypt(input.password);
    const createData: User = {
      ...input,
      username: Helper.randUserName(),
      password,
      socialType: SocialType.SYSTEM,
    };
    return await this.userRepository.create(createData);
  }

  signJWTRegister(user: User) {
    return this.hashService.signJWT(
      {
        username: user.username,
        email: user.email,
        id: user._id,
        roles: user.roles,
      } as JWTData,
      this.configService.get("JWT_EXPIRE_VERIFY")
    );
  }
}
