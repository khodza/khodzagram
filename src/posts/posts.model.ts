import { PartialType } from "@nestjs/mapped-types";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import  * as mongoose from "mongoose";
import { Document } from "mongoose";
import { User } from "src/users/users.model";

@Schema()
export class Post extends Document{
    @Prop({
        required:[true,'Post must have caption']
    })
    caption:string

    @Prop()
    likes:string[]

    @Prop()
    comments:Array<object>

    @Prop(
        { type: PartialType(User) }
    )
    author:Partial<User>
    
    @Prop({
        required:[true,'Post must have media file']
    })
    file:string;

    @Prop()
    createdAt:Date

    @Prop()
    updatedAt:Date
}

export const PostSchema = SchemaFactory.createForClass(Post)