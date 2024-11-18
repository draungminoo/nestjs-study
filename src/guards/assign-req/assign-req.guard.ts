import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { UsersService } from 'src/apps/main/users/users.service';
import { TokenService } from 'src/services/global/token/token.service';
import {
  ARE_ONLY_FOR_ADMIN,
  ARE_PUBLIC_KEY,
  IS_ONLY_FOR_ADMIN,
  IS_PUBLIC_KEY,
} from '../policy/decorator/policy.decorator';

@Injectable()
export class AssignReqGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private tokenService: TokenService,
    private usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: Request = context.switchToHttp().getRequest();

    // assign policy decorators
    try {
      // is router public
      const isPublic =
        this.reflector.get(IS_PUBLIC_KEY, context.getHandler()) ?? false;
      const arePublic =
        this.reflector.getAllAndOverride(ARE_PUBLIC_KEY, [
          context.getClass(),
          context.getHandler(),
        ]) ?? false;
      req.isRouterPublic = isPublic || arePublic;

      // is router only for admin
      const isOnlyForAdmin =
        this.reflector.get(IS_ONLY_FOR_ADMIN, context.getHandler()) ?? false;
      const areOnlyForAdmin =
        this.reflector.get(ARE_ONLY_FOR_ADMIN, context.getHandler()) ?? false;
      req.isRouterOnlyForAdmin = isOnlyForAdmin || areOnlyForAdmin;
    } catch (error) {
      console.log(error);
    }

    // assign token user
    try {
      // extract token
      const bearToken = req.headers.authorization;
      const token = bearToken?.replace('Bearer ', '') ?? '';

      // verify token
      const tokenPayload = this.tokenService.verifyAcessToken(token);
      req.tokenPayload = tokenPayload;

      // find and verify user
      const user = await this.usersService.findOne({
        where: { id: tokenPayload?.uid },
      });

      // assign user to req
      req.user = user;
    } catch (error) {
      console.log(error);
    }

    // this guard assigns user to req
    // always returns true
    return true;
  }
}
