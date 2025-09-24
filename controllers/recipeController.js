import Recipe from '../models/Recipe.js'
import User from '../models/User.js'

export async function getFilteredRecipes(req, res) {
  const user = await User.findById(req.userId);
  const userIngredients = user.ingredients;

  const recipes = await Recipe.find();

  const filtered = recipes.filter(recipe =>
    recipe.ingredients.every(ingredient =>
      userIngredients.includes(ingredient)
    )
  );

  res.json(filtered);
}

export const getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find().populate('author', 'email');
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching recipes' });
  }
};
export const getMyRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find({ author: req.userId });
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching your recipes' });
  }
};
export const createRecipe = async (req, res) => {
  const { title, ingredients, instructions, cookTime, servings, image } = req.body;
  try {
    const recipe = new Recipe({
      title,
      ingredients,
      instructions,
      cookTime,
      servings,
      image,
      author: req.userId
    });
    await recipe.save();
    res.status(201).json(recipe);
  } catch (error) {
    res.status(400).json({ message: 'Error creating recipe' });
  }
};

export const updateRecipe = async (req, res) => {
  const { id } = req.params;
  const { title, ingredients, instructions, cookTime, servings, image } = req.body;
  try {
    const recipe = await Recipe.findOneAndUpdate(
      { _id: id, author: req.userId },
      { title, ingredients, instructions, cookTime, servings, image },
      { new: true }
    );  
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found or unauthorized' });
    }
    res.status(200).json(recipe);
  } catch (error) {
    res.status(400).json({ message: 'Error updating recipe' });
  }
};

export const deleteRecipe = async (req, res) => {
  const { id } = req.params;
  try {
    const recipe = await Recipe.findOneAndDelete({ _id: id, author: req.userId });
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found or unauthorized' });
    }
    res.status(200).json({ message: 'Recipe deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting recipe' });
  }
};
export const filterRecipes = async (req, res) => {
  const user = await User.findById(req.userId);
  const userIngredients = user.ingredients;
  try {
    const recipes = await Recipe.find();
    const filtered = recipes.filter(recipe =>
      recipe.ingredients.every(ingredient =>
        userIngredients.includes(ingredient)
      )
    );
    res.status(200).json(filtered);
  } catch (error) {
    res.status(500).json({ message: 'Error filtering recipes' });
  }
};
