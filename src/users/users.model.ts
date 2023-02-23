import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bycypt from 'bcrypt';
@Schema()
export class User extends Document {
  @Prop({
    type: String,
    unique: true,
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

  @Prop({
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  })
  role: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (next) {
  if (this.isModified('password') || this.isNew) {
    this.password = await bycypt.hash(this.password, 10);
    this.confirmPassword = undefined;
  }
  next();
});
