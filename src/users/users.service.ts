import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import  { Model } from 'mongoose';
import * as mongoose from 'mongoose';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.model';
import { updatePassword } from './dto/update-password.dto';
import * as bycypt from 'bcrypt';

import{AuthService} from '../auth/auth.service'
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const newUser = await this.userModel.create(createUserDto);
      return newUser;
    } catch (err) {
      throw new BadRequestException(err.message,err);
    }
  }

  async findAll(): Promise<User[]> {
    try {
      const users = await this.userModel.find();
      return users;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async findOne(id: mongoose.Types.ObjectId,SelFields?:string,popFields?:string): Promise<User> {
    try {
      let user = this.userModel.findById(id);
      if(SelFields){
        user.select(SelFields)
     }
      if(popFields){
         user.populate(popFields,'-author')
      }
      const readyUser = await user
      if (!readyUser) {
        throw new BadRequestException(`No user with this ID : ${id}`);
      }
      return readyUser;
    } catch (err) {
      throw new BadRequestException(err.message,err);
    }
  }

  async findUserByEmail(email: string, selectField?: string): Promise<User> {
    try {
      const user = await this.userModel.findOne({ email }).select(selectField);
      if (!user) {
        throw new BadRequestException(`No user with this email ${email}`);
      }
      return user;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async update(id: mongoose.Types.ObjectId, updateOptions: UpdateUserDto) {
    try {
      const update = await this.userModel.updateOne({_id:id}, updateOptions,{runValidators:true});
      if (!update) {
        throw new BadRequestException(`No user with this id ${id}`);
      }
      const user =await this.findOne(id)
      return user;
    } catch (err) {
      throw new BadRequestException(err.message,err);
    }
  }

  async updatePassword(id:mongoose.Types.ObjectId,passwordsOpt:updatePassword){
    try{
      const user = await this.userModel.findById(id).select('password')
      if (user && (await bycypt.compare(passwordsOpt.oldPassword, user.password))) {
      user.password=passwordsOpt.password
      user.confirmPassword =passwordsOpt.confirmPassword
      await user.save()
        return {message:`Your password has been changed please login again with new password`};
      }
      throw new BadRequestException('Your old password is wrong!')
    }catch(err){
      throw new BadRequestException(err.message,err)
    }
    
  }

  async remove(id: mongoose.Types.ObjectId): Promise<{message:string}> {
    try {
      const deletedUser = await this.userModel.findByIdAndDelete(id);
      if (!deletedUser) {
        throw new BadRequestException(`No user with this ID : ${id}`);
      }
      return { message: `User with ID ${id} has been deleted` };
    } catch (err) {
      throw new BadRequestException(err.message, err);
    }
  }

  async giveAdmin(email: string): Promise<User> {
    const user = await this.findUserByEmail(email);
    if (user.roles.includes('admin')) {
      throw new BadRequestException('User is already has admin role');
    }
    user.roles.push('admin');
    user.save({ validateBeforeSave: false });
    return user;
  }
}
