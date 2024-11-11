import { Injectable } from '@nestjs/common';
import { CreateBedDto } from './dto/create-bed.dto';
import { UpdateBedDto } from './dto/update-bed.dto';

@Injectable()
export class BedsService {
  create(createBedDto: CreateBedDto) {
    return 'This action adds a new bed';
  }

  findAll() {
    return `This action returns all beds`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bed`;
  }

  update(id: number, updateBedDto: UpdateBedDto) {
    return `This action updates a #${id} bed`;
  }

  remove(id: number) {
    return `This action removes a #${id} bed`;
  }
}
