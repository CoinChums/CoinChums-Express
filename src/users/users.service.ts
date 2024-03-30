import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './modal/user.modal';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  private users: User[] = [];

  async getOne(userId: string) {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return { data: user };
  }

  async create(userData: CreateUserDto) {
    const encodeData = { name: userData.name, email: userData.email };
    const encodedToken = jwt.sign(encodeData, process.env.JWT_SECRET_KEY);
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = await this.userModel.create({
      name: userData.name,
      email: userData.email,
      password: hashedPassword,
      encodedToken,
      groupIds: [],
      couponId: '',
      deletedAt: null,
    });
    return { data: user };
  }

  update(userId: string, userData: UpdateUserDto) {
    const index = this.users.findIndex((user) => user.userId === userId);
    if (index < 0) {
      throw new NotFoundException(`User #${userId} not found`);
    }
    this.users[index] = { ...this.users[index], ...userData };
  }
}
