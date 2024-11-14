import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotAcceptableException,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { UsersService } from 'src/apps/main/users/users.service';
import { TokenService } from 'src/services/global/token/token.service';

@Injectable()
export class TokenGuard implements CanActivate {
  constructor(
    private tokenService: TokenService,
    private usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const req: Request = context.switchToHttp().getRequest();

    // skip auth route
    if (req.url.startsWith('/auth')) {
      return true;
    }

    // extract token
    const bearToken = req.headers.authorization;
    const token = bearToken.replace('Bearer ', '');

    // verify token
    const tokenPayload = this.tokenService.verifyAcessToken(token);

    // type
    if (tokenPayload.tp !== 0) {
      throw new NotAcceptableException('Incorrect token type');
    }

    // ip
    if (tokenPayload.ip !== req.ip) {
      throw new UnauthorizedException('Incorrect IP');
    }

    // find and verify user
    const user = await this.usersService.findOne({
      where: { id: tokenPayload.uid },
    });
    if (!user) {
      throw new UnauthorizedException('User does not exist');
    }

    // assign user to req
    req.user = user;

    return true;
  }
}
