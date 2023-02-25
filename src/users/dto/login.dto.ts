import { ArrayNotEmpty, IsArray, IsEmail, isString, IsString } from "class-validator";
import { User } from "../users.model";

export class LoginDto extends Request {  
    @IsEmail({},{message:'Provide valid email'})
    email:string;

    @IsString({message:'Provide valid password'})
    password:string;

    @IsString()
    id?:string
    
    @ArrayNotEmpty()
    roles?:string[]
}