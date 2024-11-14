import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserPayloadPipe } from './pipes/create-user-payload.pipe';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body(CreateUserPayloadPipe) createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}
