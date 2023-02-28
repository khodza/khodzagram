import { IsMongoId } from 'class-validator';
import * as mongoose from 'mongoose';

export class getMongoDbId {
  @IsMongoId({message:`Invalid Id`})
  readonly id: mongoose.Types.ObjectId;
}