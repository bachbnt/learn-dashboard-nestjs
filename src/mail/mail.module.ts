import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [MailService],
  imports: [
    MailerModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: configService.get('MAIL_HOST'),
          port: configService.get('MAIL_PORT'),
          secure: true,
          auth: {
            user: configService.get('MAIL_USER'),
            pass: configService.get('MAIL_PASS'),
          },
        },
        defaults: {
          from: `"No Reply" <${configService.get('MAIL_FROM')}>`,
        },
        template: {
          dir: join(__dirname + '/mail/templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [MailService],
})
export class MailModule {}
