import { Router } from 'express';
import { userController } from '@controllers/index';
import { validate, authMiddleware, authorize } from '@middleware/index';
import { filterSchema } from '@validators/index';
import { UserRole } from '../types';

const router = Router();

router.use(authMiddleware, authorize(UserRole.NORMAL_USER, UserRole.STORE_OWNER));

// Store browsing routes (mounted at /api/stores)
router.get('/', validate(filterSchema, 'query'), userController.getStores);

export default router;
