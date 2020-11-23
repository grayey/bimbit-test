import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ReviewsInterface } from '../interfaces/reviews.interface';
import { UsersInterface } from '../interfaces/users.interface'
import { DbWorker } from '../utils/dbworker.utils';

@Injectable()
export class ReviewsService {
  public dbWork;
  // public relations;

  constructor(
    @InjectModel('Reviews') private reviewModel: Model<ReviewsInterface>,
    @InjectModel('Users') private userModel: Model<UsersInterface>,

  ) {
    //* Db worker is hard to manage because you'd have to be switching models in cases of multiple db operations
    // this.dbWork = new DbWorker(userModel);
    // this.relations = { users: userModel }

  }

  /**
   *  This method creates a new review using the dbworker.
   */
  // async createreview() {
  //   this.dbWork.create();
  // }


  /**
   * This method retrieves all reviews
   * @return returns a promise of all reviews
   */
  async findAll(): Promise<ReviewsInterface[]> {
    return await this.reviewModel.find();
  }

  /**
   * This method retrieves a review by it's Id
   * @return returns a single review instance
   */
  async findOne(id: string): Promise<ReviewsInterface> {
     const review = await this.reviewModel.findOne({ _id: id });
     const users = await this.userModel.find( {review_id:review._id} )
      review['users'] = users;
      return review;

  }

  /**
   * This method creates a new review
   * @return returns the new instance
   */
  async create(review: ReviewsInterface): Promise<ReviewsInterface> {
    const newReviewsInterface = new this.reviewModel(review);
    return await newReviewsInterface.save();
  }

  /**
   * This method updates a  review
   * @return returns updated instance
   */
  async update(
    id: string,
    review: ReviewsInterface,
  ): Promise<ReviewsInterface> {
    return await this.reviewModel.findByIdAndUpdate(id, review, {
      new: true,
    });
  }

  /**
   * This method deletes a  review
   * @return 204: returns empty body
   */
  async delete(id: string): Promise<ReviewsInterface> {
    return await this.reviewModel.findByIdAndRemove(id);
  }


}
