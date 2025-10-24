import {Router } from 'express';
import { getRecipes, getRecipeById, createRecipe, updateRecipe, deleteRecipe, getRecipesByIngredients } from '../controllers/recipeController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
const router = Router();

router.get('/', getRecipes);
router.get('/:id', authMiddleware, getRecipeById);
router.post('/', authMiddleware, createRecipe);
router.put('/:id', authMiddleware, updateRecipe);
router.delete('/:id', authMiddleware, deleteRecipe);
router.post('/by-ingredients', 
authMiddleware, getRecipesByIngredients);

export default router;