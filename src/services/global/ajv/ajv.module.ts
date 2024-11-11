import { Global, Module } from '@nestjs/common';
import { AjvService } from './ajv.service';

@Global()
@Module({
  providers: [AjvService],
  exports: [AjvService],
})
export class AjvModule {}
