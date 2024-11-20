import { Module } from '@nestjs/common';
import { BedsAdminGateway } from './beds-admin.gateway';
import { BedsController } from './beds.controller';
import { BedsGateway } from './beds.gateway';
import { BedsService } from './beds.service';
import { BedInternalPolicy } from './policy/beds-internal.policy';

@Module({
  controllers: [BedsController],
  providers: [BedsService, BedsGateway, BedsAdminGateway, BedInternalPolicy],
})
export class BedsModule {}
