import { IsEmail, IsNotEmpty } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  readonly name: string;
  @IsEmail()
  readonly email: string;
  @IsNotEmpty()
  readonly password: string;
}
export class FindIdDto {
  @IsNotEmpty()
  id: number;
}
