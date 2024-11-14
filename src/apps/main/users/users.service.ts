import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcrypt';
import { BcryptEnums } from 'src/resources/enums/bcrypt.enum';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const item = this.userRepository.create(createUserDto);

    // hash password
    const hashPassword = await hash(item.password, BcryptEnums.SALT_ROUND);
    item.password = hashPassword;

    return this.userRepository.save(item);
  }

  findOne(options: FindOneOptions<User>) {
    return this.userRepository.findOne(options);
  }
}
