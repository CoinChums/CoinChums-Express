import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCoupon } from './dto/create-coupon';
import { InjectModel } from '@nestjs/mongoose';
import { Coupon } from './modal/coupon.modal';
import { Model } from 'mongoose';
import ShortUniqueId from 'short-unique-id';
import { VerifyCoupon } from './dto/verify-coupon.dto';
import { User } from 'src/users/modal/user.modal';

@Injectable()
export class CouponService {
  constructor(
    @InjectModel(Coupon.name) private couponModal: Model<Coupon>,
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  async createCoupon(couponData: CreateCoupon) {
    const coupon = await this.couponModal.create({
      userId: couponData.userId,
      joinCount: 0,
      couponCode: new ShortUniqueId({
        dictionary: 'hex',
        length: 10,
      }).randomUUID(),
    });
    return { data: coupon };
  }

  async verifyCoupon(couponData: VerifyCoupon) {
    const coupon = await this.couponModal.findOne({
      couponCode: couponData.couponCode,
    });
    if (!coupon) {
      throw new NotFoundException('Invalid coupon code');
    }
    const user = await this.userModel.findOne({ _id: couponData.userId });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    coupon.joinCount += 1;
    user.couponId = couponData.couponCode;
    await coupon.save();
    await user.save();
    return { data: user };
  }
}
