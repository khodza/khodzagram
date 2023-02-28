import { IsString } from "class-validator";

export class CreatePostDto{
    @IsString()
    caption:string

    @IsString()
    file:string;
}