import { IsMongoId } from "class-validator";

export class MongoDbID{
    @IsMongoId()
    id:string
}