import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bycypt from 'bcrypt';
@Schema()
export class User extends Document {
  @Prop({
    type: String,
    required: [true, 'Add email'],
  })
  email: string;

  @Prop({
    type: String,
    required: [true, 'Add username'],
  })
  username: string;

  @Prop({
    type: String,
    required: [true, 'Add valid password'],
    select: false,
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
    type: [String],
    enum: ['user', 'admin', 'superAdmin'],
    default: 'user',
  })
  roles: string[];

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

//CREATING INDEXES TO MAKE EMAIL AND USERNAME UNIQUE

UserSchema.index(
  { email: 1 },
  { unique: true, collation: { locale: 'en', strength: 2 } },
);
UserSchema.index(
  { username: 1 },
  { unique: true, collation: { locale: 'en', strength: 2 } },
);

//HANDLING DUPLICATE FIELD ERRORS

UserSchema.post(['save','updateOne'], function (error, doc, next) {
  if (error.code === 11000) {
    if (error.keyPattern.email) {
      next(new Error('Email address already exists'));
    } else if (error.keyPattern.username) {
      next(new Error('Username already exists'));
    } else {
      next(error);
    }
  } else {
    next(error);
  }
});

//HASHING PASSWORD

UserSchema.pre('save', async function (next) {
  if (this.isModified('password') || this.isNew) {
    this.password = await bycypt.hash(this.password, 10);
    this.confirmPassword = undefined;
  }
  next();
});
