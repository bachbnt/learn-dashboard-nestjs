import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { UserDto } from 'src/users/dto/user.dto';

export class SignInReqDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  password: string;
}

export class SignInResDto {
  user: UserDto;
  token: string;
  message: string;
}
