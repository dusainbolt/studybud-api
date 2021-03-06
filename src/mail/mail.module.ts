import { MailerModule } from "@nestjs-modules/mailer";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import { Module } from "@nestjs/common";
import { MailService } from "./mail.service";
import { join } from "path";

@Module({
  imports: [
    MailerModule.forRoot({
      // transport: 'smtps://user@example.com:topsecret@smtp.example.com',
      // or
      transport: {
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // use SSL - TLS
        // pool: true,
        // requireTLS: true,
        auth: {
          user: "dule9xpro@gmail.com",
          pass: "osgwzqnhanxzsnad",
        },
      },
      defaults: {
        from: `no-reply@dule9xpro@gmail.com`,
      },
      template: {
        dir: join(__dirname, "templates"),
        adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService], // 👈 export for DI
})
export class MailModule {}
