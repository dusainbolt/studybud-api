import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { HashService } from "src/hash/hash.service";
import { JWTData } from "src/models/users/dto/jwt-data.dto";
import { VerifySocial } from "src/models/users/dto/verify-social.dto";
import { JWT } from "src/models/users/entity/jwt.entity";
import { UserSocial } from "src/models/users/entity/user-social.entity";
import { User } from "src/models/users/entity/user.entity";
import { Role } from "src/models/users/entity/user.enum";
import { UserRepository } from "src/models/users/user.repository";
import { Constant } from "src/utils/constant";
import { DateHelper } from "src/utils/date";
import { Helper } from "src/utils/helper";
import { MSG } from "src/utils/message";

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private hashService: HashService,
    private configService: ConfigService
  ) {}

  async validateToken(auth: string) {
    if (auth?.split(" ")[0] !== "Bearer") {
      throw Helper.apolloError(MSG.system.INVALID_TOKEN);
    }
    const token = auth.split(" ")[1];
    try {
      const JWTData = this.hashService.verifyJWT(token) as JWTData;
      const user: User = await this.userRepository.findById(JWTData.id);
      if (!!!user._id) {
        throw Helper.apolloError(MSG.system.INVALID_TOKEN);
      }
      return user;
    } catch (err) {
      throw Helper.apolloError(MSG.system.INVALID_TOKEN);
    }
  }

  async loginWithSocial(userSocial: UserSocial): Promise<VerifySocial> {
    // find user
    let user = await this.userRepository.findOne({
      email: userSocial.email,
      socialId: userSocial.socialId,
    });
    // create user
    if (!user) {
      const createUserData: User = {
        ...userSocial,
        username: Helper.randUserName(),
        roles: [Role.USER],
      };
      user = await this.userRepository.create(createUserData);
    }

    // sign jwt
    const signJWTData: JWTData = {
      email: user.email,
      username: user.username,
      id: user.id,
      roles: user.roles,
    };

    const dayExp = this.configService.get(Constant.env.EXPIRE_JWT);
    const jwt: JWT = {
      value: this.hashService.signJWT(signJWTData),
      exp: DateHelper.generateExpire(Number(dayExp)).toDate(),
      createdAt: new Date(),
    };

    user.tokens.push(jwt);

    await user.save();

    user.tokens = null;

    return { token: jwt.value, user };
  }
}
