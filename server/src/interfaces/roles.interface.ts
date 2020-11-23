import { Document } from 'mongoose';


export interface RolesInterface extends Document {
  id?: string;
  name: string;
  description: string;
  status: boolean;
  tasks: any;
  users:any;
  created_at: Date;
  updated_at: Date;
}
