import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<Coupon>;

@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    currentTime: () => Date.now(),
  },
  versionKey: false,
})
export class Coupon {
  @Prop()
  userId: string;
  @Prop()
  couponId: string;
  @Prop()
  couponCode: string;
  @Prop()
  deletedAt: Date | null;
  @Prop({ default: 0 })
  joinCount: number;

  constructor(userId: string, couponId: string) {
    this.userId = userId;
    this.deletedAt = null;
    this.couponId = couponId;
    this.couponCode = '';
    this.joinCount = 0;
  }
}

export const CouponSchema = SchemaFactory.createForClass(Coupon);
