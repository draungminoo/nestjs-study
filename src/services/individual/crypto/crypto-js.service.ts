import { Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto';

@Injectable()
export class CryptoJsService {
  randomHexString(bytes: number) {
    return randomBytes(bytes).toString('hex');
  }
}
