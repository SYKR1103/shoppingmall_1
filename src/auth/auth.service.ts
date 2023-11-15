import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserService } from 'src/user/user.service';
import { HttpException, HttpStatus} from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TokenPayloadInterface } from './TokenPayloadInterface';


@Injectable()
export class AuthService {

  constructor(private readonly userService : UserService,
    private readonly configService : ConfigService,
    private readonly jwtService : JwtService,
    
    
    ) {}

  async createUser(createUserDto:CreateUserDto) {
  
    try {
    return await this.userService.createUser(createUserDto)
  } catch (e) {
    console.log(e);
     throw new HttpException("not found", HttpStatus.INTERNAL_SERVER_ERROR)}}




    async loginUser(LoginUserDto:LoginUserDto) {
      const user = await this.userService.findUserByemail(LoginUserDto.email)
      // if (user.password != LoginUserDto.password) {
      //   throw new HttpException(
      //     'password not match', HttpStatus.BAD_REQUEST
      //   )
      // }

      const isMatched = await user.checkPassworrd(LoginUserDto.password)
      // true나 false로 반환
      if (!isMatched) {throw new HttpException('pw not matched', HttpStatus.BAD_REQUEST)}


      return user

    }


    public generateJwtAccessToken(userId : string) {

      const payload : TokenPayloadInterface = {userId};
      const token = this.jwtService.sign(payload, {
        secret : "sample",
        expiresIn : "10m"
      })


    }

}
