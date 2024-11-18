import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { CryptoJsService } from 'src/services/individual/crypto/crypto-js.service';

@Injectable()
export class PolicyGuard implements CanActivate {
  constructor(private cryptoJsService: CryptoJsService) {}

  async canActivate(context: ExecutionContext) {
    const req: Request = context.switchToHttp().getRequest();

    // is router public
    if (req.isRouterPublic) {
      return true;
    }

    // is user valid
    if (!req.user?.active) {
      throw new UnauthorizedException(`User account is inactive`);
    }

    // is user account locked
    if (req.user?.isLocked) {
      throw new UnauthorizedException(`User account is locked`);
    }

    // is ip matched
    if (req.ip !== req.tokenPayload.ip) {
      throw new UnauthorizedException(`IP not matched`);
    }

    // user agent
    if (
      this.cryptoJsService.hexString(req.headers['user-agent']) !==
      req.tokenPayload.usa
    ) {
      throw new UnauthorizedException(`User agent not matched`);
    }

    // is router only for admin
    if (req.isRouterOnlyForAdmin) {
      if (req.user?.isAdmin) {
        return true;
      } else {
        throw new UnauthorizedException(`Allow only admin user`);
      }
    }

    // check user
    if (!req.user) {
      throw new UnauthorizedException(`No user`);
    }

    // rules
    // =======

    return true;
  }
}
