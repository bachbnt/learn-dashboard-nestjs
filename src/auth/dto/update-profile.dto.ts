import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateProfileReqDto {
  @IsNotEmpty()
  @IsString()
  fullName: string;
}

export class UpdateProfileResDto {
  message: string;
}
