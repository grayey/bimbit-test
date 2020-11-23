import { Schema } from 'mongoose';

export const ReviewsSchema = new Schema({
  // user_id: {
  //    type: String,
  //    max: 100,
  //  }, users don't have to be logged in
  email: {
    type: String,
    max: 500,
  },
  description: {
    type: String,
    max: 500,
  },
  
  status: {
      type: Number,
      default: 0, // reviews can be 0, 1, 2 i.e not_validated, approved, rejected
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
      type: Date,
      default: Date.now,
    },

});
