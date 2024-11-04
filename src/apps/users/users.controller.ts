import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('all')
  getUsers() {
    return this.usersService.getUsers();
  }

  @Get('query')
  // http://localhost:3000/users?username=aungminoo&id=1
  getUsersByQuery(@Query() query: any) {
    console.log(query);
    return this.usersService.getUsers();
  }

  @Get(':id')
  // http://localhost:3000/users/32
  getUserById(@Param('id') id: string) {
    console.log(id, typeof id);
    return this.usersService.findUserById(+id);
  }

  @Post('signin')
  signinUser(@Body() body: any) {
    return this.usersService.signinUser(body.username, body.password);
  }

  @Post()
  createUser() {
    return { message: 'I am working' };
  }

  @Patch()
  updatePartOfEntity(@Body() body: any) {
    console.log(body);
    return this.usersService.updateRecord(body.name, body.username);
  }

  @Delete()
  deteleRecord() {}
}

/**
 * Methods
 * GET = to get data, to find data
 * (Query, Param)
 *
 * Post = to create
 * (Param, Body)
 *
 * Patch = to update record
 */

// get query
// http://localhost:3000/users?username=aungminoo&id=1
// param
// http://localhost:3000/users/aungminoo
// http://localhost:3000/users/32
