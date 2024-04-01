import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateGroupDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  readonly description: string;

  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  readonly members: string[];

  @IsString()
  @IsOptional()
  readonly category?: string;

  @IsString()
  @IsNotEmpty()
  readonly createdBy: string;
}
