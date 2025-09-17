const mongoose = require('mongoose');

const mealPlanSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  week: Number,
  year: Number,
  days: [{
    day: String,
    recipes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }]
  }]
});

module.exports = mongoose.model('MealPlan', mealPlanSchema);
