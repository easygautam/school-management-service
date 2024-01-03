import { Controller, Get } from '@nestjs/common';
import { CurrentUser } from 'src/auth/annot/current-user.annot';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  async getUserDetails(@CurrentUser() user) {
    return user; // await this.userService.getUserById(user.id);
  }
}
