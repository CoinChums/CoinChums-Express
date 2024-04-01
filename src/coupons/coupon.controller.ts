import { Body, Controller, Post } from '@nestjs/common';
import { CreateCoupon } from './dto/create-coupon';
import { CouponService } from './coupon.service';
import { VerifyCoupon } from './dto/verify-coupon.dto';

@Controller('coupon')
export class CouponController {
  constructor(private couponService: CouponService) {}
  @Post()
  async createCoupon(@Body() couponData: CreateCoupon) {
    return await this.couponService.createCoupon(couponData);
  }

  @Post('verify')
  async verifyCoupon(@Body() couponData: VerifyCoupon) {
    return await this.couponService.verifyCoupon(couponData);
  }
}
