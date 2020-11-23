import { Document } from 'mongoose';


export interface ReviewsInterface extends Document {
  id?: string;
  // user_id:string;
  email: string;
  description: string;
  status: boolean;
  created_at: Date;
  updated_at: Date;
}
