import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  password?: string;

  @IsOptional()
  @IsString({ each: true })
  groupIds?: string[];

  @IsOptional()
  @IsString()
  couponId?: string;
}
