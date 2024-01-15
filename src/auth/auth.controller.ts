import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
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

@Controller('auth')
@UseGuards(AuthGuard)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  signIn(@Body() signInReq: SignInReqDto) {
    return this.authService.signIn(signInReq);
  }

  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post('register')
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

  @Post('change-password')
  async changePassword(
    @Request() req,
    @Body() changePasswordReq: ChangePasswordReqDto,
  ) {
    return this.authService.changePassword(req.user, changePasswordReq);
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
