import { Request } from '@nestjs/common';
import { User } from '../../users/users.model';

export interface ReqWithUser extends Request {
  user: User;
}
