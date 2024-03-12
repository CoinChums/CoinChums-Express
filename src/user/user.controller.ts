import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './schema/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Types } from 'mongoose';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getAllUsers(): Promise<User[]> {
    return await this.userService.findAll();
  }
  @Get(':userId')
  async getUser(@Param('userId') userId: string): Promise<User> {
    return await this.userService.findOne(userId);
  }

  @Post()
  async createUser(@Body() user: CreateUserDto): Promise<User> {
    return await this.userService.create(user);
  }

  @Put(':userId')
  async updateUser(
    @Param('userId') userId: Types.ObjectId,
    @Body() user: UpdateUserDto,
  ): Promise<User> {
    console.log('user', user);
    console.log('userId', userId);
    return await this.userService.updateUser(userId, user);
  }

  @Delete(':userId')
  async deleteUser(@Param('userId') userId: string): Promise<User> {
    return await this.userService.deleteUser(userId);
  }
}
