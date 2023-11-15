import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';

@Injectable()
export class UserService {

  @InjectRepository(User)
  private userRepo : Repository<User>

  async createUser(createUserDto:CreateUserDto) {
    const newuser = await this.userRepo.create(createUserDto)
    await this.userRepo.save(newuser)
    return newuser
  }

  async findUserById(id:string) {
    const founduser = await this.userRepo.findOneBy({id})
    if (founduser) {return founduser}
  
    throw new HttpException('not found', HttpStatus.NOT_FOUND
    )
  }

  async findUserByemail(email:string) {
    const founduser = await this.userRepo.findOneBy({email})
    if (founduser) {return founduser}
  
    throw new HttpException('not found', HttpStatus.NOT_FOUND
    )
  }




}
