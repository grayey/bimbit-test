import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';


import { RolesModule } from './roles.module';
import { TasksModule } from './tasks.module';



@Module({
  imports:[
      TasksModule,
      RolesModule
  ],
  controllers: [ ],
  providers:[ ]
})

export class AdminModule {}
