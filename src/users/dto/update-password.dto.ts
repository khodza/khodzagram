import { IsString } from "class-validator";

export class updatePassword{

    @IsString({message:'Provide your old password'})
    oldPassword:string
    
    @IsString({message:'Provide valid password'})
    password:string

    @IsString({message:'Confirm your password'})
    confirmPassword:string
}