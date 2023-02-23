import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RoleGuard } from 'src/auth/guards/role.auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get()
  @Roles('admin')
  findAllUsers() {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('search-by-email')
  @Roles('user')
  findOneByEmail(@Query() email) {
    return this.usersService.findUserByEmail(email.email);
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get(':id')
  @Roles('admin')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Patch(':id')
  @Roles('admin')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Delete(':id')
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
