import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },

  pantry: [
    {
      ingredient: { type: Schema.Types.ObjectId, ref: 'Ingredient' },
      quantity: Number,
      unit: String
    }
  ],

  shoppingList: [
    {
      ingredient: { type: Schema.Types.ObjectId, ref: 'Ingredient' },
      quantity: Number,
      unit: String,
      checked: { type: Boolean, default: false }
    }
  ]
});

export default model('User', userSchema);
