import { JwtModuleAsyncOptions } from '@nestjs/jwt';
import jwtSecret from './jwt-secret';

export const jwtConstance: JwtModuleAsyncOptions = {
  useFactory: () => {
    return {
      secret: jwtSecret().jwt_secret,
      expiresIn: '1296000s',
    };
  },
};
