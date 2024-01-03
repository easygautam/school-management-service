import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Public } from './jwt.constants';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  async doLogin(@Body() login: LoginDto) {
    console.log({ data: login });
    return await this.authService.login(login);
  }

  @Public()
  @Post('register')
  async doRegister(@Body() register: RegisterDto) {
    return await this.authService.registerNewUser(register);
  }

  @Post('refresh-token')
  doRefreshToken() {
    return { msg: 'Token refreshed' };
  }

  @Post('logout')
  doLogout() {
    return { msg: 'logged out' };
  }
}
