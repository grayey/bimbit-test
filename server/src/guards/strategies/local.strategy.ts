import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../../services/auth.service';
import * as bcrypt from "bcrypt";



@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super(async (username, password, done)=>{

      try {
        let user = await this.authService.findByEither(username);

        const emailOrUserName = username.includes('@') ? "Email" : "Username";


        //if not handle it
        if (!user) {
            return done(null, {
                status: false,
                message: `That ${emailOrUserName} doesn't exist. Have you registered?`,
                statusCode:401
            });
        }

        //match password
        const userPassword = user.password || '';
        const passwordsMatch  = user ? await bcrypt.compare(password, userPassword) : false;
        if (!passwordsMatch) {
            return done(null, {
                status: false,
                message: "Invalid password! Please check or reset.",
                statusCode:401
            })
        }

        //otherwise return user
        done(null, user);

    } catch (error) {
        done(null, false);
    }

    });

  }

  async validate(username: string, password: string): Promise<any> {
    const unsignedUser = await this.authService.validateUser(username, password);
    if (!unsignedUser) {
      throw new UnauthorizedException();
    }
    const user = unsignedUser._doc;
    user.password = undefined; // i.e, delete user.password
    return await this.authService.login(user); //JWT Signed User
  }
}
