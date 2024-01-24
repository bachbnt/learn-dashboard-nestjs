import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendResetPasswordEmail(email: string, token: string): Promise<void> {
    const url = `http://localhost:5173/reset-password?token=${token}`;
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
