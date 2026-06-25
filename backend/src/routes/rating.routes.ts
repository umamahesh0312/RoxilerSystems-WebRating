import { Router } from 'express';
import { userController } from '@controllers/index';
import { validate, authMiddleware, authorize } from '@middleware/index';
import { createRatingSchema, updateRatingSchema } from '@validators/index';
import { UserRole } from '../types';

const router = Router();

router.use(authMiddleware, authorize(UserRole.NORMAL_USER, UserRole.STORE_OWNER));

// Rating routes (mounted at /api/ratings)
router.post('/', validate(createRatingSchema, 'body'), userController.submitRating);
router.put('/:storeId', validate(updateRatingSchema, 'body'), userController.updateRating);
router.get('/:storeId', userController.getUserRatingForStore);

export default router;
