import { Module } from '@nestjs/common';
import { BedsAdminGateway } from './beds-admin.gateway';
import { BedsController } from './beds.controller';
import { BedsGateway } from './beds.gateway';
import { BedsService } from './beds.service';

@Module({
  controllers: [BedsController],
  providers: [BedsService, BedsGateway, BedsAdminGateway],
})
export class BedsModule {}
