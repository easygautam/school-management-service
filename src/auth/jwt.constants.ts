import { SetMetadata } from '@nestjs/common';

export class JWTConstants {
  static secretKey = 'super-secret';
}

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
