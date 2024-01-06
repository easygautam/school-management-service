import { Controller, Get, ParseIntPipe, Query, ValidationPipe } from '@nestjs/common';
import { CurrentUser } from 'src/auth/annot/current-user.annot';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  async getUserDetails(@CurrentUser() user) {
    return user; // await this.userService.getUserById(user.id);
  }

  @Get()
  async getUserById(@Query('id', ParseIntPipe) id: number,  ) {
    console.log(typeof id === 'number'); // true
    return id;
  }
}
