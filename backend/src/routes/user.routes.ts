import { Router } from 'express';
import { userController } from '@controllers/index';
import { validate, authMiddleware, authorize } from '@middleware/index';
import { createRatingSchema, updateRatingSchema, filterSchema } from '@validators/index';
import { UserRole } from '@types/index';

const router = Router();

router.use(authMiddleware, authorize(UserRole.NORMAL_USER, UserRole.STORE_OWNER));

/**
 * @swagger
 * /api/stores:
 *   get:
 *     summary: Get all stores with optional user ratings
 *     tags: [User]
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
 *         name: search
 *         schema:
 *           type: string
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *     responses:
 *       200:
 *         description: Stores retrieved successfully with user ratings
 */
router.get('/', validate(filterSchema, 'query'), userController.getStores);

/**
 * @swagger
 * /api/ratings:
 *   post:
 *     summary: Submit a rating for a store
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - storeId
 *               - rating
 *             properties:
 *               storeId:
 *                 type: string
 *               rating:
 *                 type: number
 *                 minimum: 1
 *                 maximum: 5
 *     responses:
 *       201:
 *         description: Rating submitted successfully
 */
router.post('/ratings', validate(createRatingSchema, 'body'), userController.submitRating);

/**
 * @swagger
 * /api/ratings/{storeId}:
 *   put:
 *     summary: Update rating for a store
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: storeId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - rating
 *             properties:
 *               rating:
 *                 type: number
 *                 minimum: 1
 *                 maximum: 5
 *     responses:
 *       200:
 *         description: Rating updated successfully
 */
router.put('/ratings/:storeId', validate(updateRatingSchema, 'body'), userController.updateRating);

/**
 * @swagger
 * /api/ratings/{storeId}:
 *   get:
 *     summary: Get user's rating for a store
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: storeId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User's rating retrieved
 */
router.get('/ratings/:storeId', userController.getUserRatingForStore);

/**
 * @swagger
 * /api/user/ratings:
 *   get:
 *     summary: Get all ratings submitted by the user
 *     tags: [User]
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
 *     responses:
 *       200:
 *         description: User's ratings retrieved successfully
 */
router.get('/user/ratings', userController.getUserRatings);

export default router;
