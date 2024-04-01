import { IsString } from 'class-validator';

export class CreateCoupon {
  @IsString()
  readonly userId: string;
}
