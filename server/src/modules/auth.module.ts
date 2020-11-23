import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from '../services/auth.service';
import { LocalStrategy } from '../guards/strategies/local.strategy';
import { JwtStrategy } from '../guards/strategies/jwt.strategy';
import { UsersModule } from '../modules/users.module';
import { jwtConstants } from '../utils/constants/auth.constants';



@Module({

 imports: [ UsersModule, PassportModule,
   JwtModule.register(jwtConstants),
    ],
 providers: [ AuthService, LocalStrategy, JwtStrategy],
 exports:[ AuthService ]

})
export class AuthModule {}
