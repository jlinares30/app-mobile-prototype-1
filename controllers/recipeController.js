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
        const { query } = req.query;

        const filter = query
      ? { title: { $regex: query, $options: "i" } }
      : {};
    const recipes = await Recipe.find(filter);
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
export const getRecipeById = async (req, res) => {
  const { id } = req.params;
  try {
    const recipe = await Recipe.findById(id).populate('ingredients.ingredient');
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching recipe' });
  }
};

export const getRecipesByIngredients = async (req, res) => {
try {
    const { ingredientIds } = req.body; // lista de IDs de ingredientes seleccionados
    const recipes = await Recipe.find().populate("ingredients");

    const results = recipes.map((recipe) => {
      const recipeIngredientIds = recipe.ingredients.map((ing) => ing._id.toString());
      const matches = recipeIngredientIds.filter((id) =>
        ingredientIds.includes(id)
      );

      const matchPercentage =
        recipeIngredientIds.length > 0
          ? Math.round((matches.length / recipeIngredientIds.length) * 100)
          : 0;

      return {
        ...recipe.toObject(),
        matchPercentage,
      };
    });

    // Ordenar por porcentaje de coincidencia (de mayor a menor)
    results.sort((a, b) => b.matchPercentage - a.matchPercentage);

    res.json(results);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    res.status(500).json({ message: "Error fetching recipes" });
  }
};

export const createRecipe = async (req, res) => {
  const { title, description, ingredients, steps } = req.body;
  
  try {
    const recipe = new Recipe({
      title,
      description,
      ingredients,
      steps,
      createdBy: req.userId
    });

    await recipe.save();
    await recipe.populate('ingredients.ingredient');

    res.status(201).json(recipe);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Error creating recipe', error: error.message });
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
