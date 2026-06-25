import { Router } from 'express';
import { ownerController } from '@controllers/index';
import { authMiddleware, authorize } from '@middleware/index';
import { UserRole } from '../types';

const router = Router();

router.use(authMiddleware, authorize(UserRole.STORE_OWNER));

/**
 * @swagger
 * /api/owner/dashboard:
 *   get:
 *     summary: Get store owner dashboard statistics
 *     tags: [StoreOwner]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard data with average rating and total ratings
 */
router.get('/dashboard', ownerController.getDashboard);

/**
 * @swagger
 * /api/owner/stores:
 *   get:
 *     summary: Get all stores owned by the store owner
 *     tags: [StoreOwner]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Stores retrieved successfully
 */
router.get('/stores', ownerController.getStores);

/**
 * @swagger
 * /api/owner/ratings:
 *   get:
 *     summary: Get all ratings for store owner's stores
 *     tags: [StoreOwner]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: number
 *       - in: query
 *         name: storeId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Ratings retrieved successfully
 */
router.get('/ratings', ownerController.getRatings);

export default router;
