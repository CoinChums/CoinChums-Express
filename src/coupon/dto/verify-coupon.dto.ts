import { IsString } from 'class-validator';

export class VerifyCoupon {
  @IsString()
  readonly couponCode: string;
  @IsString()
  readonly userId: string;
}
