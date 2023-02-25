import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
@Controller('auth')
export class AuthController {
  constructor(
    private readonly usersService: UsersService,
    private authService: AuthService,
  ) {}

  //SIGN UP
  @Post('signup')
  async signup(@Body() reqUser: CreateUserDto) {
    const user = await this.usersService.create(reqUser);
    return this.authService.login(user);
  }

  //LOGIN
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req ) {
    return this.authService.login(req.user);
  }
}
