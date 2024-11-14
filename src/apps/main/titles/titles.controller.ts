import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { TitlesService } from './titles.service';
import { CreateTitleDto } from './dto/create-title.dto';
import { UpdateTitleDto } from './dto/update-title.dto';
import { Request } from 'express';

@Controller('titles')
export class TitlesController {
  constructor(private readonly titlesService: TitlesService) {}

  @Post()
  create(@Body() createTitleDto: CreateTitleDto) {
    return this.titlesService.create(createTitleDto);
  }

  @Get()
  findAll(@Req() req: Request) {
    console.log(req.user);
    return this.titlesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.titlesService.findOne({ where: { id: +id } });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTitleDto: UpdateTitleDto) {
    return this.titlesService.update({ where: { id: +id } }, updateTitleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.titlesService.remove({ where: { id: +id } });
  }
}
