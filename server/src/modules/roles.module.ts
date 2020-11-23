import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RolesController } from '../controllers/roles.controller';
import { RolesService } from '../services/roles.service';
import { RolesSchema } from '../schemas/roles.schema';
import { UsersSchema } from '../schemas/users.schema';



@Module({
  imports:[
    MongooseModule.forFeature([
      { name: "Users", schema: UsersSchema },
      { name: "Roles", schema: RolesSchema },
      ]),
  ],
  controllers: [RolesController, ],
  providers:[RolesService, ]
})

export class RolesModule {}
