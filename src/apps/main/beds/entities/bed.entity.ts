import { AbstractEntity } from 'src/resources/base/abstract-entity.base';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Ward } from '../../wards/entities/ward.entity';

@Entity()
export class Bed extends AbstractEntity<Bed> {
  @Column({ nullable: false })
  bedNo: string;

  @ManyToOne(() => Ward, (ward) => ward.beds)
  @JoinColumn()
  ward: Ward;
}

/**
 * create table Ward (
 *  id: ------------------
 * )
 * 
 * create table Bed (
 *  wardId: number <-------
 * )
 * 
 * select * from Bed where wardId = ward.id
 */