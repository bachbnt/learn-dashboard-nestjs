import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { SignInReqDto, SignInResDto } from './dto/sign-in.dto';
import { plainToInstance } from 'class-transformer';
import { UserDto } from 'src/users/dto/user.dto';
import { SignUpReqDto } from './dto/sign-up.dto';
import * as bcrypt from 'bcrypt';
import { saltOrRounds } from './auth.decorator';
import {
  ForgotPasswordReqDto,
  ForgotPasswordResDto,
} from './dto/forgot-password.dto';
import { ResetPasswordReqDto } from './dto/reset-password.dto';
import {
  ChangePasswordReqDto,
  ChangePasswordResDto,
} from './dto/change-password.dto';
import { MailService } from 'src/mail/mail.service';
import {
  UpdateProfileReqDto,
  UpdateProfileResDto,
} from './dto/update-profile.dto';
import { GetProfileResDto } from './dto/get-profile.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly mailService: MailService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(signInReq: SignInReqDto): Promise<SignInResDto> {
    const { email, password } = signInReq;
    const user = await this.usersService.findOne(email);
    if (!user) {
      throw new ConflictException(`User with email ${email} not found.`);
    }
    const isMatch = await bcrypt.compare(password, user?.password);
    if (!isMatch) {
      throw new UnauthorizedException('Wrong password');
    }
    const payload = { sub: user._id, email: user.email };
    const token = await this.jwtService.signAsync(payload);
    return {
      user: plainToInstance(UserDto, user),
      token,
      message: 'Login successfully',
    };
  }

  async signUp(signUpReq: SignUpReqDto): Promise<SignInResDto> {
    const { email, password, fullName } = signUpReq;
    const existingUser = await this.usersService.findOne(email);
    if (existingUser) {
      throw new ConflictException(`User with email ${email} already exists.`);
    }

    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    const newUser = await this.usersService.create({
      email,
      password: hashedPassword,
      fullName,
    });
    const payload = { sub: newUser._id, email: newUser.email };
    const token = await this.jwtService.signAsync(payload);

    return {
      user: plainToInstance(UserDto, newUser),
      token,
      message: 'Register successfully',
    };
  }

  async forgotPassword(
    forgotPasswordReq: ForgotPasswordReqDto,
  ): Promise<ForgotPasswordResDto> {
    const { email } = forgotPasswordReq;
    const payload = { email };
    const resetToken = await this.jwtService.signAsync(payload, {
      expiresIn: '7d',
    });

    await this.mailService.sendResetPasswordEmail(email, resetToken);
    return {
      message: `Reset password link sent to ${email}`,
    };
  }

  async resetPassword(
    resetPasswordReq: ResetPasswordReqDto,
  ): Promise<ForgotPasswordResDto> {
    const { token, password } = resetPasswordReq;
    const decodedToken = await this.jwtService.verifyAsync(token);
    if (!decodedToken || !decodedToken.email) {
      throw new UnauthorizedException('Invalid token');
    }

    const user = await this.usersService.findOne(decodedToken.email);
    if (!user) {
      throw new UnauthorizedException(
        `User with email ${decodedToken.email} not found`,
      );
    }

    const newHashedPassword = await bcrypt.hash(password, saltOrRounds);
    await this.usersService.update(user._id, {
      password: newHashedPassword,
    });
    return {
      message: `Reset password successfully`,
    };
  }

  async changePassword(
    user: any,
    changePasswordReq: ChangePasswordReqDto,
  ): Promise<ChangePasswordResDto> {
    const { oldPassword, newPassword } = changePasswordReq;
    const isMatchOldPassword = await bcrypt.compare(
      oldPassword,
      user?.password,
    );
    if (!isMatchOldPassword) {
      throw new UnauthorizedException('Old password is wrong');
    }

    const newHashedPassword = await bcrypt.hash(newPassword, saltOrRounds);
    await this.usersService.update(user.sub, {
      password: newHashedPassword,
    });
    return {
      message: 'Change password successfully',
    };
  }

  async updateProfile(
    user: any,
    updateProfileReq: UpdateProfileReqDto,
  ): Promise<UpdateProfileResDto> {
    const { fullName } = updateProfileReq;
    await this.usersService.update(user.sub, {
      fullName,
    });
    return {
      message: 'Update profile successfully',
    };
  }

  async getProfile(user: any): Promise<GetProfileResDto> {
    const _user = await this.usersService.findById(user.sub);
    if (!_user) {
      throw new UnauthorizedException(
        `User with email ${user.email} not found`,
      );
    }
    return {
      user: plainToInstance(UserDto, _user),
    };
  }
}
