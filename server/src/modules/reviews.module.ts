import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReviewsController } from '../controllers/reviews.controller';
import { ReviewsService } from '../services/reviews.service';
import { ReviewsSchema } from '../schemas/reviews.schema';
import { UsersSchema } from '../schemas/users.schema';



@Module({
  imports:[
    MongooseModule.forFeature([
      { name: "Users", schema: UsersSchema },
      { name: "Reviews", schema: ReviewsSchema },
      ]),
  ],
  controllers: [ReviewsController, ],
  providers:[ReviewsService, ]
})

export class ReviewsModule {}
