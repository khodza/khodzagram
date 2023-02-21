import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.model';
import { Mode } from 'fs';
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

  async findOne(id: number): Promise<User> {
    try {
      const user = await this.userModel.findById(id);
      return user;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
  async findUserByEmail(email: string): Promise<User> {
    try {
      const user = await this.userModel.findOne({ email });
      return user;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.userModel.findByIdAndUpdate(id);
      return user;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
