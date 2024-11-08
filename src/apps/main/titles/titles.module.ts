import { Module } from '@nestjs/common';
import { TitlesService } from './titles.service';
import { TitlesController } from './titles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Title } from './entities/title.entity';

@Module({
  controllers: [TitlesController],
  providers: [TitlesService],
  imports: [TypeOrmModule.forFeature([Title])],
})
export class TitlesModule {}
