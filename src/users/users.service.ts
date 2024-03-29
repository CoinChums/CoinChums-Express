import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './modal/user.modal';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  private users = [];

  getAll() {
    return this.users;
  }

  async getOne(userId: string) {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async create(userData: CreateUserDto) {
    const user = await this.userModel.create({
      name: userData.name,
      email: userData.email,
      encodedToken: 'sample token',
      groupIds: [],
      couponId: '',
      deletedAt: null,
    });
    console.log(user, 'user');
    return user;
  }

  update(userId: string, userData: UpdateUserDto) {
    const index = this.users.findIndex((user) => user.userId === userId);
    if (index < 0) {
      throw new NotFoundException(`User #${userId} not found`);
    }
    this.users[index] = { ...this.users[index], ...userData };
  }
}
