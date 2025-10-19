import {Router } from 'express';
import { getMealPlans, createMealPlan, getMealPlanById, updateMealPlan, deleteMealPlan } from '../controllers/mealPlanController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
const router = Router();

router.get('/', authMiddleware, getMealPlans);
router.get('/:id', authMiddleware, getMealPlanById);
router.post('/', authMiddleware, createMealPlan);
router.put('/:id', authMiddleware, updateMealPlan);
router.delete('/:id', authMiddleware, deleteMealPlan);

export default router;
