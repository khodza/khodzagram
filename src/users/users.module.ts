import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './users.model';
import { AuthService } from 'src/auth/auth.service';
import { LocalStrategy } from 'src/auth/strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstance } from 'src/auth/constants/jwt-constants';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { AuthController } from 'src/auth/auth.controller';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './error-Handler/http-exception-filter';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    JwtModule.registerAsync(jwtConstance),
  ],
  controllers: [AuthController, UsersController],
  providers: [UsersService, AuthService, LocalStrategy, JwtStrategy,{provide:APP_FILTER,useClass:HttpExceptionFilter}],
})
export class UsersModule {}
