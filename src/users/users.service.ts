import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.model';

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
      throw new BadRequestException(err);
    }
  }

  async findAll(): Promise<User[]> {
    try {
      const Users = await this.userModel.find();
      return Users;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async findOne(id: string): Promise<User> {
    try {
      const user = await this.userModel.findById(id);
      if (!user) {
        throw new BadRequestException(`No user with this email ${id}`);
      }
      return user;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
  async findUserByEmail(email: string, selectField?: string): Promise<User> {
    try {
      let user;
      if (!selectField) {
        user = await this.userModel.findOne({ email });
      }
      user = await this.userModel.findOne({ email }).select(selectField);
      if (!user) {
        throw new BadRequestException(`No user with this email ${email}`);
      }
      return user;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.userModel.findByIdAndUpdate(id, updateUserDto);
      if (!user) {
        throw new BadRequestException(`No user with this email ${id}`);
      }
      return user;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async remove(id: string) {
    await this.userModel.findByIdAndDelete(id);
    return `User with ID ${id} has been deleted`;
  }

  async giveAdmin(email: string): Promise<User> {
    const user = await this.findUserByEmail(email);
    if (user.roles.includes('admin')) {
      throw new BadRequestException('User is alredy has admin role');
    }
    user.roles.push('admin');
    user.save({ validateBeforeSave: false });
    return user;
  }
}
