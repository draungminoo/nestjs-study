import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { AppEnvValues } from 'src/resources/env/app.env';
import { UsersService } from '../users/users.service';
import { SigninPayloadType, TokenPayloadType } from './auth.type';
import { CryptoJsService } from 'src/services/individual/crypto/crypto-js.service';
import { Request } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private cryptoJsService: CryptoJsService,
    private usersService: UsersService,
  ) {}

  async signinUser(req: Request, payload: SigninPayloadType) {
    const user = await this.usersService.findOne({
      where: { username: payload.username },
    });

    // verify password
    const isPasswordCorrect = await compare(payload.password, user.password);
    if (!isPasswordCorrect) {
      throw new UnauthorizedException(`Password is incorrect`);
    }

    const userAgentHex = this.cryptoJsService.hexString(
      req.headers['user-agent'],
    );

    // generate access token
    const accessTokenPayload: TokenPayloadType = {
      tp: 0,
      uid: user.id,
      ip: req.ip,
      usa: userAgentHex,
    };
    const accessToken = sign(accessTokenPayload, AppEnvValues.JWT_SECRET_KEY, {
      expiresIn: AppEnvValues.ACCESS_TOKEN_EXP_SECOND,
    });

    // generate refresh token
    const refreshTokenPayload: TokenPayloadType = {
      tp: 1,
      uid: user.id,
      ip: req.ip,
      usa: userAgentHex,
    };
    const refreshToken = sign(
      refreshTokenPayload,
      AppEnvValues.JWT_SECRET_KEY,
      {
        expiresIn: AppEnvValues.REFRESH_TOKEN_EXP_SECOND,
      },
    );

    return { accessToken, refreshToken };
  }
}
