import { Module } from '@nestjs/common';
import { MainDatabaseService } from './main-database.service';

@Module({
  providers: [MainDatabaseService],
  exports: [MainDatabaseService],
})
export class MainDatabaseModule {}
