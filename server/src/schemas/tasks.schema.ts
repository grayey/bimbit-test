import { Schema } from 'mongoose';

export const TasksSchema = new Schema({

  name: {
    type: String,
    max: 50,
  },
  path: {
    type: String,
    max: 100,
  },
  method: {
      type: String,
      default: 100,
  },

  module_name: {
      type: String,
      default: 100,
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
