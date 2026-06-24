import { Router } from 'express';
import authRoutes from './auth.routes';
import adminRoutes from './admin.routes';
import userRoutes from './user.routes';
import ownerRoutes from './owner.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/admin', adminRoutes);
router.use('/stores', userRoutes);
router.use('/ratings', userRoutes);
router.use('/owner', ownerRoutes);

export default router;
