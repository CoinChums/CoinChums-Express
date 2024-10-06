import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './modal/user.modal';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  async getOne(userId: string) {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return { data: user };
  }

  async login(userData: LoginUserDto) {
    const user = await this.userModel.findOne({ email: userData.email });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const isPasswordMatch = await bcrypt.compare(
      userData.password,
      user.password,
    );
    if (!isPasswordMatch) {
      throw new NotFoundException('Invalid password');
    }
    return { data: user };
  }

  async create(userData: CreateUserDto) {
    const foundUser = await this.userModel.findOne({ email: userData.email });
    if (foundUser) {
      throw new ConflictException('User already exists');
    }
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
    console.log(userId, userData);
  }
}
