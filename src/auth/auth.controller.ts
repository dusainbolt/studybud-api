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
import { OAuth2Google } from "src/models/users/dto/oauth2-google.dto";
import { VerifySocial } from "src/models/users/dto/verify-social.dto";
import { UserSocial } from "src/models/users/entity/user-social.entity";
import { SocialType } from "src/models/users/entity/user.enum";
import { Constant } from "src/utils/constant";
import { Helper } from "src/utils/helper";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  private readonly _logger = new Logger(AuthController.name);

  constructor(
    private readonly http: HttpService,
    private readonly authService: AuthService
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
      this._logger.log("google/:idToken ", e);
      throw new HttpException("Post not found", HttpStatus.UNAUTHORIZED);
      // return Helper.apiError(MSG.logic.INVALID_USER);
    }
  }
}
