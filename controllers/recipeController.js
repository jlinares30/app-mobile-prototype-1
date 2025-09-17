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
