import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { AdminModule } from './admin.module';
import { AuthModule } from './auth.module';
import { ReviewsModule } from './reviews.module';
import * as dotenv from 'dotenv';

dotenv.config();
const environment = process.env;
const DB_URL = environment.NODE_ENV == 'production' ? 'DB_PROD_URL' : 'DB_DEV_URL';

@Module({
  imports: [

    AdminModule,
    AuthModule,
    ReviewsModule,
    MongooseModule.forRoot(environment[DB_URL]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
