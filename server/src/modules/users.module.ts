import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersController } from '../controllers/users.controller';
import { UsersService } from '../services/users.service';
import { UsersSchema } from '../schemas/users.schema';
import { RolesSchema } from '../schemas/roles.schema';




@Module({
  imports:[
    MongooseModule.forFeature([
      { name: "Users", schema: UsersSchema },
      { name: "Roles", schema: RolesSchema },
    ]),
  ],
  controllers: [ UsersController, ],
  providers:[ UsersService ],
  exports:[ UsersService ]
})

export class UsersModule {}
