import {Router } from 'express';
import { getRecipes, getMyRecipes, createRecipe, updateRecipe, deleteRecipe, filterRecipes } from '../controllers/recipeController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
const router = Router();

router.get('/', getRecipes);
router.get('/my', authMiddleware, getMyRecipes);
router.post('/', authMiddleware, createRecipe);
router.put('/:id', authMiddleware, updateRecipe);
router.delete('/:id', authMiddleware, deleteRecipe);
router.get('/filter', authMiddleware, filterRecipes);
export default router;