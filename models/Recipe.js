import { time } from 'drizzle-orm/mysql-core';
import { Schema, model } from 'mongoose';

const recipeSchema = new Schema({
  title: { type: String, required: true },
  description: String,

  ingredients: [
    {
      ingredient: { type: Schema.Types.ObjectId, ref: 'Ingredient' },
      quantity: Number,
      unit: String
    }
  ],

  steps: [String],
  time: { type: String, required: true },

  createdBy: { type: Schema.Types.ObjectId, ref: 'User' }
});

export default model('Recipe', recipeSchema);
