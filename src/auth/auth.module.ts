import { Global, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JWTConstants } from './jwt.constants';
import { JwtStretegy } from './strategy/jwt.strategy';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './guard/jwt-auth.guard';

@Global()
@Module({
  imports: [
    JwtModule.register({
      secret: JWTConstants.secretKey,
      signOptions: { expiresIn: '60m' },
    }),
  ],
  exports: [JwtModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStretegy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AuthModule {}
