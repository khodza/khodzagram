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
import { updatePassword } from './dto/update-password.dto';

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

  //UPDATE LOGGED IN USER 
  @UseGuards(JwtAuthGuard)
  @Patch('update-me')
  updateLoggedUser( @Request() req, @Body() updateOptions: UpdateUserDto){
    return this.usersService.update(req.user.userId,updateOptions)
  }

  //UPDATE MY PASSWORD
  @UseGuards(JwtAuthGuard)
  @Patch('update-my-password')
  updatePasswordOfCurrentUser(@Request() req ,@Body() passwordsOpt:updatePassword ){
    return this.usersService.updatePassword(req.user.userId,passwordsOpt)
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
  update(@Param('id') id: string, @Body() updateOptions: UpdateUserDto) {
    return this.usersService.update(id, updateOptions);
  }

  //DELETE USER
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Delete(':id')
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  //SUPER-ADMIN ROUTES

  //GIVE ADMIN
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post('give-admin')
  @Roles('superAdmin')
  giveAdmin(@Body() body: giveAdminDto) {
    return this.usersService.giveAdmin(body.email);
  }
}
