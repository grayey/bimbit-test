import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Patch,
    Body,
    Req,
    Res,
    Param,
    UseGuards,
} from '@nestjs/common';
import { ReviewsService } from '../services/reviews.service';
import { ReviewsInterface } from '../interfaces/reviews.interface';

@Controller('reviews')
export class ReviewsController {

    constructor(private readonly reviewService: ReviewsService) { }

    /**
     * This method retrieves all reviews
     * @return returns a promise of all reviews
     */
    @Get()
    findAll(): Promise<ReviewsInterface[]> {
        return this.reviewService.findAll();
    }

    /**
     * This method retrieves a review by it's Id
     * @return returns a single review instance
     */
    @Get(':id')
    findOne(@Param('id') id): Promise<ReviewsInterface> {
        return this.reviewService.findOne(id);
    }

    /**
     * This method creates a new review
     * @return returns the new instance
     */
    @Post()
    create(@Body() createReviewDto): Promise<ReviewsInterface> {
        return this.reviewService.create(createReviewDto);
    }

    /**
     * This method deletes a  review
     * @return 204: returns empty body
     */
    @Delete(':id')
    delete(@Param('id') id): Promise<ReviewsInterface> {
        return this.reviewService.delete(id);
    }

    /**
     * This method updates a  review
     * @return returns updated instance
     */
    @Put(':id')
    update(@Body() updateReviewDto, @Param('id') id): Promise<ReviewsInterface> {
        return this.reviewService.update(id, updateReviewDto);
    }


}
