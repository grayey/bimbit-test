import { Schema } from 'mongoose';

export const UsersSchema = new Schema({

  full_name: {
    type: String,
    max: 50,
  },
  username: {
    type: String,
    max: 100,
  },
  email: {
    type: String,
    max: 100,
  },
  password: {
    type: String,
    max: 100,
  },
  phone_no: {
    type: String,
    max: 100,
  },
  user_type: {
    type: String,
    max: 100,
  },
    role_id: {
    type: String,
    default:null,
    max: 100,
  },
  status: {
      type: Boolean,
      default: true,
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
