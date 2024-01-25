import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  async sendResetPasswordEmail(email: string, token: string): Promise<void> {
    const url = `${this.configService.get(
      'CLIENT_URL',
    )}/reset-password?token=${token}`;
    await this.mailerService.sendMail({
      to: email,
      subject: 'Reset Password',
      template: './reset-password',
      context: {
        email,
        url,
      },
    });
  }
}
