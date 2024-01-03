import { IsEmail, IsMobilePhone, IsNotEmpty } from 'class-validator';

export class RegisterDto {

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  @IsMobilePhone()
  mobile: string;

  @IsNotEmpty()
  password: string;
}
