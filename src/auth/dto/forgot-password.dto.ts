import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class ForgotPasswordReqDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;
}

export class ForgotPasswordResDto {
  message: string;
}
