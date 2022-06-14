import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { User } from "src/models/users/entity/user.entity";

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendUserConfirmation(user: User, token: string) {
    const url = `example.com/auth/confirm?token=${token}`;

    await this.mailerService.sendMail({
      to: "dulh181199@gmail.com",
      // from: '"Support Team" <support@example.com>', // override default from
      subject: "Welcome to Studybud! Confirm your Email",
      template: "confirmation", // `.hbs` extension is appended automatically
      context: {
        // ✏️ filling curly brackets with content
        name: user.name,
        url,
      },
    });
  }
}
