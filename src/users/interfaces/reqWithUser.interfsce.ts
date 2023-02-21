import { Request } from '@nestjs/common';
import { User } from '../users.model';

export interface ReqWithUser extends Request {
  user: User;
}
