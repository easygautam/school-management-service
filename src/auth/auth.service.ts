import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { UserService } from 'src/user/user.service';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { use } from 'passport';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(login: LoginDto) {
    // Check user is valid
    let user = await this.userService.getUserByMobile(login.mobile);
    if (
      !user &&
      user.mobile !== login.mobile &&
      user.password !== login.password
    ) {
      throw new ForbiddenException('Invalid credential');
    }
    // Check password is valid
    let { password, ...result } = user;
    // Generarate jwt token and return
    let payload = { userId: user.id };
    let tokenResult = {
      ...result,
      token: await this.jwtService.signAsync(payload),
    };
    return tokenResult;
  }

  async registerNewUser(register: RegisterDto) {
    return this.userService.createNewUser(register)
  }
}
