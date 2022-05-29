import { ConfigService } from "@nestjs/config";
import { Injectable } from "@nestjs/common";
import * as CryptoJS from "crypto-js";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { Constant } from "src/utils/constant";
@Injectable()
export class HashService {
  private secret;
  private appKey;

  constructor(private configService: ConfigService) {
    this.secret = this.configService.get(Constant.env.JWT_SECRET);
    this.appKey = this.configService.get(Constant.env.APP_KEY);
  }

  hashCryptoAES(data: object | string): string {
    return CryptoJS.AES.encrypt(JSON.stringify(data), this.appKey).toString();
  }

  unHashCryptoAES(hash: string): any {
    const bytes = CryptoJS.AES.decrypt(hash, this.appKey);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  }

  hashMD5Crypto(message: string): string {
    return CryptoJS.MD5(message).toString();
  }

  async hashBcrypt(message: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(message, salt);
  }

  async matchBcrypt(message, hash): Promise<boolean> {
    return bcrypt.compare(message, hash);
  }

  signJWT(data: any): string {
    return jwt.sign(data, this.secret);
  }

  verifyJWT(token: string) {
    return jwt.verify(token, this.secret);
  }
}
