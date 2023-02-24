import { IsEmail, IsString } from 'class-validator';
export class giveAdminDto {
  @IsString()
  @IsEmail()
  email: string;
}
