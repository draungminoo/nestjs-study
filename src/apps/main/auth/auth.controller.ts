import { Body, Controller, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { IsPublic } from 'src/guards/policy/decorator/policy.decorator';
import { AuthService } from './auth.service';
import { SigninPayloadType } from './auth.type';
import { SigninPayloadPipe } from './pipes/signin-payload.pipe';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @IsPublic()
  @Post('signin')
  signinUser(
    @Body(SigninPayloadPipe) payload: SigninPayloadType,
    @Req() req: Request,
  ) {
    return this.authService.signinUser(req, payload);
  }
}
