import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags('user')

export class UserController {
  constructor(private readonly userService: UserService) {}



    @Post()
    async createUser(@Body() CreateUserDto:CreateUserDto) {
      return this.userService.createUser(CreateUserDto)
    }


    @Get("id")
    async findUserById(@Param(":id") id:string) {
      return this.userService.findUserById(id)
    }
 
}
