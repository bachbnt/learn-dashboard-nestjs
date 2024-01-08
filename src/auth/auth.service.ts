import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { SignInResDto } from './dto/signin.dto';
import { plainToInstance } from 'class-transformer';
import { UserDto } from 'src/users/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string): Promise<SignInResDto> {
    const user = await this.usersService.findOne(email);
    if (user?.password !== password) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.userId, email: user.email };
    const token = await this.jwtService.signAsync(payload);
    return {
      user: plainToInstance(UserDto, user),
      token,
    };
  }
}
