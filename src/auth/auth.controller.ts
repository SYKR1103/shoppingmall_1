import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/signup")
  async createUser(@Body() createuserdto:CreateUserDto) {
    return await this.authService.createUser(createuserdto)
  }

  @Post("/login")
  async loginUser(@Body() LoginUserDto:LoginUserDto) {
    return await this.authService.loginUser(LoginUserDto)
    // 로그인 된 사람 user로 받아서 해당 id로 액세스 토큰을 발급함. 
    const user = await this.authService.loginUser(LoginUserDto)
    // 아래 함수는 특정코드 및 발급기간을 특정 id에 부여하는 함수, auth.service에 정의함
    const token =await this.authService.generateJwtAccessToken(user.id)
    return token
  }


}
