import MealPlan from "../models/MealPlan.js";

export const getMealPlans = async (req, res) => {
    try {
        const mealPlans = await MealPlan.find({ user: req.user._id }).populate('days.meals.recipes');
        res.status(200).json(mealPlans);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching meal plans', error });
    }
};

export const getMealPlanById = async (req, res) => {
    try {
        const { id } = req.params;
        const mealPlan = await MealPlan.findOne({ _id: id, user: req.user._id }).populate('days.meals.recipes');
        if (!mealPlan) {
            return res.status(404).json({ message: 'Meal plan not found' });
        }
        res.status(200).json(mealPlan);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching meal plan', error });
    }
};

export const createMealPlan = async (req, res) => {
  try {
    const { title, description, days } = req.body;
    const newMealPlan = new MealPlan({
      user: req.user._id,
      title,
      description,
      days
    });

    const savedPlan = await newMealPlan.save();
    res.status(201).json(savedPlan);
  } catch (error) {
    res.status(500).json({ message: 'Error creando el meal plan', error });
  }
};
export const updateMealPlan = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, isActive, days } = req.body;
        const mealPlan = await MealPlan.findOneAndUpdate(
            { _id: id, user: req.user._id },
            { title, description, isActive, days },
            { new: true }
        );
        if (!mealPlan) {
            return res.status(404).json({ message: 'Meal plan not found' });
        }
        res.status(200).json(mealPlan);
    } catch (error) {
        res.status(500).json({ message: 'Error updating meal plan', error });
    }
};

export const deleteMealPlan = async (req, res) => {
    try {
        const { id } = req.params;
        const mealPlan = await MealPlan.findOneAndDelete({ _id: id, user: req.user._id });
        if (!mealPlan) {
            return res.status(404).json({ message: 'Meal plan not found' });
        }
        res.status(200).json({ message: 'Meal plan deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting meal plan', error });
    }
};

