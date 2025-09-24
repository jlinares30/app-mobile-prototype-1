import {Router} from 'express'
import { getAllIngredients, createIngredient } from '../controllers/ingredientsController.js'
import authMiddleware from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/', authMiddleware ,getAllIngredients)
router.post('/', authMiddleware ,createIngredient)

export default router;