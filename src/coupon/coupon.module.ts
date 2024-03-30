import { Module } from '@nestjs/common';
import { CouponService } from './coupon.service';
import { CouponController } from './coupon.controller';
import { CouponSchema } from './modal/coupon.modal';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/users/modal/user.modal';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Coupon', schema: CouponSchema },
      { name: 'User', schema: UserSchema },
    ]),
  ],
  providers: [CouponService],
  controllers: [CouponController],
})
export class CouponModule {}
