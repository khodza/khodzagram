import { IsString, IsEmail } from 'class-validator';
import { Transform } from 'class-transformer';
export class CreateUserDto {
  @IsString()
  username: string;

  @Transform(({ value }) => value.toLowerCase())
  @IsEmail({},{message:'Provide valid email'})
  email: string;

  @IsString({message:'Provide valid password'})
  password: string;

  @IsString({message:'Confirm your password'})
  confirmPassword: string;
}
