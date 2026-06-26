import { Router } from 'express';
import { userController } from '@controllers/index';
import { validate, authMiddleware, authorize } from '@middleware/index';
import { createRatingSchema, updateRatingSchema } from '@validators/index';
import { UserRole } from '../types';

const router = Router();

// Rating routes (mounted at /api/ratings)
router.post(
  '/',
  authMiddleware,
  authorize(UserRole.NORMAL_USER, UserRole.STORE_OWNER),
  validate(createRatingSchema, 'body'),
  userController.submitRating
);

router.put(
  '/:storeId',
  authMiddleware,
  authorize(UserRole.NORMAL_USER, UserRole.STORE_OWNER),
  validate(updateRatingSchema, 'body'),
  userController.updateRating
);

router.get(
  '/:storeId',
  authMiddleware,
  authorize(UserRole.NORMAL_USER, UserRole.STORE_OWNER, UserRole.ADMIN),
  userController.getUserRatingForStore
);

export default router;
