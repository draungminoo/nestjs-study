import { AbstractEntity } from 'src/resources/base/abstract-entity.base';
import { Column, Entity, OneToMany } from 'typeorm';
import { Bed } from '../../beds/entities/bed.entity';

@Entity()
export class Ward extends AbstractEntity<Ward> {
  @Column({ nullable: false, unique: true })
  wardName: string;

  @OneToMany(() => Bed, (bed) => bed.ward)
  beds: Bed[];
}
