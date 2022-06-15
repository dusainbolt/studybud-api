import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { User } from "src/models/users/entity/user.entity";

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly config: ConfigService
  ) {}

  async sendUserConfirmation(user: User, token: string) {
    const url = `${this.config.get("DOMAIN_USER")}/register/verify?q=${token}`;

    await this.mailerService.sendMail({
      to: user.email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: "Confirm your Email",
      template: "confirmation", // `.hbs` extension is appended automatically
      context: {
        // ✏️ filling curly brackets with content
        name: user.name,
        url,
      },
    });
  }
}
