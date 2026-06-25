import { Router } from 'express';
import { userController } from '@controllers/index';
import { authMiddleware, authorize } from '@middleware/index';
import { UserRole } from '../types';

const router = Router();

router.use(authMiddleware, authorize(UserRole.NORMAL_USER, UserRole.STORE_OWNER));

// User-specific routes (mounted at /api/user)
router.get('/profile', userController.getProfile);
router.get('/dashboard', userController.getUserDashboard);
router.get('/ratings', userController.getUserRatings);

export default router;
