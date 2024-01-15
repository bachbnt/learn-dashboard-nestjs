import { IsNotEmpty, IsString } from 'class-validator';

export class ChangePasswordReqDto {
  @IsNotEmpty()
  @IsString()
  oldPassword: string;

  @IsNotEmpty()
  @IsString()
  newPassword: string;
}

export class ChangePasswordResDto {
  message: string;
}
