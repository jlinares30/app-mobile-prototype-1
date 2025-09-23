import {Router} from 'express'
import { getAllIngredients } from '../controllers/ingredientsController'
import authMiddleware from '../middlewares/authMiddleware';

const router = Router();

router.get('/', authMiddleware ,getAllIngredients)

export default router;