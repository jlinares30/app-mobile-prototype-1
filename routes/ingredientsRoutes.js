import {Router} from 'express'
import { getAllIngredients } from '../controllers/ingredientsController.js'
import authMiddleware from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/ingredients', authMiddleware ,getAllIngredients)

export default router;