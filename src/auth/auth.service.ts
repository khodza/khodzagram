import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/users.model';
import { UsersService } from '../users/users.service';
import * as bycypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}
  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userService.findUserByEmail(
      email,
      'password email roles',
    );
    if (user && (await bycypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async login(user: User ): Promise<{ access_token: string }> {
    const payload = { userId: user.id, email: user.email, roles: user.roles };
    const token = this.jwtService.sign(payload);
    return {
      access_token: token,
    };
  }
}
