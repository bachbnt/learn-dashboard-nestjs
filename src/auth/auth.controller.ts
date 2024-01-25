import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInReqDto } from './dto/sign-in.dto';
import { Public } from './auth.decorator';
import { AuthGuard } from './auth.guard';
import { SignUpReqDto } from './dto/sign-up.dto';
import { ForgotPasswordReqDto } from './dto/forgot-password.dto';
import { ResetPasswordReqDto } from './dto/reset-password.dto';
import { ChangePasswordReqDto } from './dto/change-password.dto';
import { UpdateProfileReqDto } from './dto/update-profile.dto';

@Controller('auth')
@UseGuards(AuthGuard)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('sign-in')
  signIn(@Body() signInReq: SignInReqDto) {
    return this.authService.signIn(signInReq);
  }

  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post('sign-up')
  signUp(@Body() signUpReq: SignUpReqDto) {
    return this.authService.signUp(signUpReq);
  }

  @Public()
  @Post('forgot-password')
  async forgotPassword(@Body() forgotPasswordReq: ForgotPasswordReqDto) {
    return this.authService.forgotPassword(forgotPasswordReq);
  }

  @Public()
  @Post('reset-password')
  async resetPassword(@Body() resetPasswordReq: ResetPasswordReqDto) {
    return this.authService.resetPassword(resetPasswordReq);
  }

  @Put('change-password')
  async changePassword(
    @Request() req,
    @Body() changePasswordReq: ChangePasswordReqDto,
  ) {
    return this.authService.changePassword(req.user, changePasswordReq);
  }

  @Put('update-profile')
  async updateProfile(
    @Request() req,
    @Body() updateProfileReq: UpdateProfileReqDto,
  ) {
    return this.authService.updateProfile(req.user, updateProfileReq);
  }

  @Get('profile')
  getProfile(@Request() req) {
    return this.authService.getProfile(req.user);
  }
}
