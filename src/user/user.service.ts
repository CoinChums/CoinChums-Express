import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model, Types } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  async findAll(): Promise<User[]> {
    const user = await this.userModel.find();
    return user;
  }

  async findOne(userId: string): Promise<User> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async create(user: CreateUserDto): Promise<User> {
    const newUser = await this.userModel.create(user);
    return newUser;
  }

  async updateUser(id: Types.ObjectId, user: UpdateUserDto): Promise<User> {
    const updatedUser = await this.userModel.findByIdAndUpdate(id, user, {
      new: true,
      runValidators: true,
    });
    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }
    return updatedUser;
  }

  async deleteUser(userId: string): Promise<User> {
    const deletedUser = await this.userModel.findByIdAndDelete(userId);
    if (!deletedUser) {
      throw new NotFoundException('User not found');
    }
    return deletedUser;
  }
}
