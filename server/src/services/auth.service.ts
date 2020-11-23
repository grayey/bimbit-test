import { Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';

import { LoginInDto } from '../dtos/users.dto';
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

/**
 * [validateUser description]
 * @param  username [description]
 * @param  password [description]
 * @return          [description]
 */
  async validateUser(username:string, password: string): Promise<any> {
    const logInData : LoginInDto = {username, password}
    const user = await this.usersService.attemptUserLogin(logInData);
    if (user) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

/**
 * [login description]
 * @param  user [description]
 * @return      [description]
 */
  async login(user: any) {
    return {
      access_token: this.jwtService.sign(user),
    };
  }

  async findByEither(username){
    return await this.usersService.findByEither(username);
  }
}
