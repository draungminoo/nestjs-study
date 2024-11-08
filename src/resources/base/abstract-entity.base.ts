import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { YesNoEnum } from '../enums/yes-no.enum';

export abstract class AbstractEntity<T> {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: YesNoEnum.YES })
  active: YesNoEnum;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  modifiedDate: Date;

  constructor(entity: Partial<T>) {
    Object.assign(this, entity);
  }
}
