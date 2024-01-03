import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JWTConstants } from '../jwt.constants';
import { UserService } from 'src/user/user.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JwtStretegy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWTConstants.secretKey,
    });
  }

  async validate(payload: any) {
    console.log('Validate user id from token is ', payload);
    let userId = payload.userId;
    if (!userId) throw new UnauthorizedException();
    let { password, ...user } = await this.userService.getUserById(userId);
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
