import * as apiService from './api.service';


export default class ReviewsService{

 
     /**
      * This method returns a list of all reviews
      */
     getAllReviews = async () => {
        const url = 'reviews';
        return await apiService.get(url);
    }


    /**
     * 
     * @param {*} reviewData 
     * this method creates a new review
     */
     createReview = async(reviewData) => {
        const url = 'reviews/';
        return await apiService.post(url,reviewData);
    }

    /**
     * 
     * @param {*} review 
     * @param {*} id 
     * This method updates a review
     */
     updateReview = async(review, id) => {
        const url =`reviews/${id}/`;
        return await apiService.put(url,review);

    }

    /**
     * 
     * @param {*} review
     * This method deletes a review
     */
     deleteReview = async(review) => {
        const url = `reviews/${review._id}`
        return await apiService.del(url);
    }

    /**
     * 
     * @param {*} review 
     * This method toggles a review
     */
     toggleReview = async(review) =>{
      review.status = !review.status
      return this.updateReview(review, review._id);
    }

    /**
      * This method returns a review by its slug
      * 
      */
        getReviewBySlug = async(reviewSlug) => {
        const url = `reviews/${reviewSlug}`;
        return await apiService.get(url);
    }






}