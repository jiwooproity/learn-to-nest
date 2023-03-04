import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Query,
  Body,
} from '@nestjs/common';
import { CreateUserDto, User } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  findAllUser(): Promise<User[]> {
    return this.userService.findAllUser();
  }

  @Get('/search')
  searchUser(@Query('name') name: string) {
    return this.userService.searchUser(name);
  }

  @Get(':id')
  findOneUser(@Param('id') id: number): Promise<User> {
    return this.userService.findOne(id);
  }

  @Post('/register')
  registerUser(@Body() user: CreateUserDto) {
    return this.userService.registerUser(user);
  }

  @Delete('/unregister')
  unregisterUser(@Query('id') id: number) {
    return this.userService.unregisterUser(id);
  }
}
