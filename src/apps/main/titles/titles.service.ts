import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { CreateTitleDto } from './dto/create-title.dto';
import { UpdateTitleDto } from './dto/update-title.dto';
import { Title } from './entities/title.entity';

@Injectable()
export class TitlesService {
  constructor(
    @InjectRepository(Title) private titleRespository: Repository<Title>,
  ) {}

  count(options?: FindManyOptions<Title>) {
    return this.titleRespository.count(options);
  }

  create(createTitleDto: CreateTitleDto) {
    const title = this.titleRespository.create(createTitleDto);
    return this.titleRespository.save(title);
  }

  findAll(options?: FindManyOptions<Title>) {
    return this.titleRespository.find(options);
  }

  findOne(options?: FindOneOptions<Title>) {
    return this.titleRespository.findOne(options);
  }

  async update(options: FindOneOptions<Title>, updateTitleDto: UpdateTitleDto) {
    const item = await this.findOne(options);
    return this.titleRespository.save({ ...item, ...updateTitleDto });
  }

  async remove(options: FindOneOptions<Title>) {
    const item = await this.findOne(options);
    const id = item.id;

    await this.titleRespository.remove(item);

    item.id = id;
    return item;
  }
}
