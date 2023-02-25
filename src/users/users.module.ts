import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './users.model';
import { AuthService } from '../auth/auth.service';
import { LocalStrategy } from 'src/auth/strategies/local.strategy';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstance } from 'src/auth/constants/jwt-constants';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { AuthController } from 'src/auth/auth.controller';
// import { APP_FILTER, APP_PIPE } from '@nestjs/core';
// import { HttpExceptionFilter } from './error-Handler/http-exception-filter';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    JwtModule.registerAsync(jwtConstance),
  ],
  controllers: [AuthController, UsersController],
  providers: [
    UsersService,
    AuthService,
    JwtStrategy,
    LocalStrategy,
    // {provide:APP_FILTER,useClass:HttpExceptionFilter},
    // { provide: APP_PIPE, useValue: new ValidationPipe({ whitelist: true }) },
  ],
})
export class UsersModule {}
