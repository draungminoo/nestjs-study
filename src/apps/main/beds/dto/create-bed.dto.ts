import { PartialType } from '@nestjs/mapped-types';
import { Bed } from '../entities/bed.entity';

export class CreateBedDto extends PartialType(Bed) {}
