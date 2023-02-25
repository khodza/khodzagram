import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { User } from 'src/users/users.model';
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }
  async validate(email: string, password: string):Promise<User> {
    
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new BadRequestException('Wrong password or email!');
    }
    return user;
  }
}
