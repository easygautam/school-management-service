import { PartialType } from '@nestjs/mapped-types';
import { CreateInstituteDto } from './create-institute.dto';
import {
  IsOptional,
  IsString,
  IsBoolean,
  IsEmail,
  IsMobilePhone,
  IsNotEmpty,
  IsNumber,
} from 'class-validator';

export class UpdateInstituteDto extends PartialType(CreateInstituteDto) {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsMobilePhone()
  mobile: string;

  @IsOptional()
  @IsEmail({}, { message: 'Invalid email address' })
  email?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsBoolean()
  blocked?: boolean;
}
