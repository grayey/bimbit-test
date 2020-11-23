import { Document } from 'mongoose';

export interface UsersInterface extends Document {
  id?: string;
  full_name: string;
  username: string;
  email: string;
  password: string;
  phone_no: string;
  user_type: string;
  status: boolean;
  role_id: string;
  created_at: Date;
  updated_at: Date;
}
