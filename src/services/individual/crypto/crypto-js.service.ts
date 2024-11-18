import { Injectable } from '@nestjs/common';
import { createHash, randomBytes } from 'crypto';

@Injectable()
export class CryptoJsService {
  randomHexString(bytes: number) {
    return randomBytes(bytes).toString('hex');
  }

  hexString(string: string) {
    return createHash('sha256').update(string).digest('hex');
  }
}
