import {
  Controller,
  Get,
  HttpException,
  HttpService,
  HttpStatus,
  Logger,
  Param,
  Req,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { HashService } from "src/hash/hash.service";
import { JWTData } from "src/models/users/dto/jwt-data.dto";
import { OAuth2Google } from "src/models/users/dto/oauth2-google.dto";
import { VerifySocial } from "src/models/users/dto/verify-social.dto";
import { UserSocial } from "src/models/users/entity/user-social.entity";
import { SocialType, UserStatus } from "src/models/models.enum";
import { UserRepository } from "src/models/users/user.repository";
import { Constant } from "src/utils/constant";
import { Helper } from "src/utils/helper";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  private readonly _logger = new Logger(AuthController.name);

  constructor(
    private readonly http: HttpService,
    private readonly authService: AuthService,
    private userRepository: UserRepository,
    private hashService: HashService
  ) {}

  @UseGuards(AuthGuard(Constant.imports.FACEBOOK_STRATEGY))
  @Get("facebook")
  async verifyFacebookToken(@Req() req) {
    const userSocial: UserSocial = req.user;
    const response: VerifySocial = await this.authService.loginWithSocial(
      userSocial
    );

    return Helper.apiOk(response);
  }

  @Get("google/:idToken")
  async verifyGoogleToken(@Param("idToken") idToken: string) {
    try {
      const data: OAuth2Google = (await this.http
        .get(`https://oauth2.googleapis.com/tokeninfo?id_token=${idToken}`)
        .toPromise()) as any;

      const userSocial: UserSocial = {
        avatar: data.picture,
        name: data.name,
        firstName: data.given_name,
        lastName: data.family_name,
        email: data.email,
        socialId: data.sub,
        socialType: SocialType.GOOGLE,
      };

      const response: VerifySocial = await this.authService.loginWithSocial(
        userSocial
      );

      return Helper.apiOk(response);
    } catch (e) {
      this._logger.error(`google/:idToken: ${e}`);
      throw new HttpException(e?.response, e?.status || HttpStatus.BAD_REQUEST);
    }
  }

  @Get("register/:token")
  async verifyRegisterToken(@Param("token") token: string) {
    try {
      const JWTData = this.hashService.verifyJWT(token) as JWTData;
      const user = await this.userRepository.findById(JWTData.id);
      if (!user) {
        throw new HttpException("Invalid user", HttpStatus.UNAUTHORIZED);
      } else if (user && user.status === UserStatus.ACTIVE) {
        throw new HttpException("User already", HttpStatus.BAD_REQUEST);
      }

      const newJWT = this.hashService.signJWT({
        username: user.username,
        email: user.email,
        roles: user.roles,
        id: user.id,
      } as JWTData);
      // active user
      user.status = UserStatus.ACTIVE;
      await user.save();

      return Helper.apiOk(newJWT);
    } catch (e) {
      this._logger.error(`register/:token: ${e}`);
      throw new HttpException(e?.response, e?.status || HttpStatus.BAD_REQUEST);
    }
  }
}
