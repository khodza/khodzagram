import {
  Controller,
  Get,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Query,
  Post,
  Body,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RoleGuard } from 'src/auth/guards/role.auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { giveAdminDto } from './dto/give-admin.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //GET PROFILE
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  //SEARCH BY EMAIL
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('search-by-email')
  @Roles('user')
  findOneByEmail(@Query() query) {
    return this.usersService.findUserByEmail(query.email);
  }

  //ADMIN ROUTES

  //GET ALL USERS
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get()
  @Roles('admin')
  findAllUsers() {
    return this.usersService.findAll();
  }

  //GET USER BY ID
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get(':id')
  @Roles('admin')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  //UPDATE USER
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Patch(':id')
  @Roles('admin')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  //DELTEE USER
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Delete(':id')
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  //SUPERADMIN ROUTES

  //GIVE ADMIN
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post('give-admin')
  @Roles('superAdmin')
  giveAdmin(@Body() body: giveAdminDto) {
    return this.usersService.giveAdmin(body.email);
  }
}
