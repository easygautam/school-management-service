import { IsEmail, IsMobilePhone, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsMobilePhone()
  mobile: string;

  @IsNotEmpty()
  password: string;
}
