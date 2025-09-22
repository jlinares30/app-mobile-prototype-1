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

  createdBy: { type: Schema.Types.ObjectId, ref: 'User' }
});

export default model('Recipe', recipeSchema);
