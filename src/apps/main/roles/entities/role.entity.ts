import { AbstractEntity } from 'src/resources/base/abstract-entity.base';
import { Column, Entity, Unique } from 'typeorm';

@Entity()
@Unique('UniqueRoleName', ['name'])
export class Role extends AbstractEntity<Role> {
  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;
}
