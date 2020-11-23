import { Document } from 'mongoose';

export interface TasksInterface extends Document {
  id?: string;
  path: string;
  name: string;
  method: string;
  module_name:string;
  created_at: Date;
  updated_at: Date;
}
