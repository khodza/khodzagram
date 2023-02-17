// import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({
    type: String,
    required: [true, 'Add email'],
  })
  email: string;
  @Prop({
    type: String,
    required: [true, 'Add valid password'],
  })
  password: string;

  @Prop({
    type: String,
    required: [true, 'Please confirm your password'],
    // Works only on .crate and .save
    validate: {
      validator(el) {
        return el === this.password;
      },
      message: 'Passwords are not same',
    },
  })
  confirmPassword: string;
  required: [true, 'Please confirm your password'];
}

export const UserSchema = SchemaFactory.createForClass(User);

// UserSchema.pre('save', function (next) {
//   console.log('A user is about to be saved');
//   if (this.isModified('password' || this.isNew)) next();
// });

// export const UserSchema = new mongoose.Schema({
//   email: {
//     type: String,
//     required: [true, 'Add email'],
//   },
// password: {
//   type: String,
//   required: [true, 'Add valid password'],
// },
//   confirmPassword: {
//     type: String,
//     required: [true, 'Please confirm your password'],
//     // Works only on .crate and .save
//     validate: {
//       validator(el) {
//         return el === this.password;
//       },
//       message: 'Passwords are not same',
//     },
//   },
// });

// export interface User {
//   email: string;
//   password: string;
//   confirmPassword: string;
// }
