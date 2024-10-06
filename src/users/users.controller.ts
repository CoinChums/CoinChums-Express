import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get(':id')
  async getUser(@Param('id') movieId: string) {
    return await this.userService.getOne(movieId);
  }

  @Post('signup')
  async create(@Body() userData: CreateUserDto) {
    return await this.userService.create(userData);
  }

  @Post('login')
  async login(@Body() userData: LoginUserDto) {
    return await this.userService.login(userData);
  }

  @Patch(':id')
  update(@Param('id') movieId: string, @Body() userData: UpdateUserDto) {
    return this.userService.update(movieId, userData);
  }
}
