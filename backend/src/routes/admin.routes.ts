import { Router } from 'express';
import { adminController } from '@controllers/index';
import { validate, authMiddleware, authorize } from '@middleware/index';
import {
  createUserSchema,
  updateUserSchema,
  createStoreSchema,
  updateStoreSchema,
  filterSchema,
} from '@validators/index';
import { UserRole } from '@types/index';

const router = Router();

router.use(authMiddleware, authorize(UserRole.ADMIN));

/**
 * @swagger
 * /api/admin/dashboard:
 *   get:
 *     summary: Get admin dashboard statistics
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard data retrieved
 */
router.get('/dashboard', adminController.getDashboard);

// Users routes
/**
 * @swagger
 * /api/admin/users:
 *   post:
 *     summary: Create a new user
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               address:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [ADMIN, STORE_OWNER, NORMAL_USER]
 *     responses:
 *       201:
 *         description: User created successfully
 */
router.post('/users', validate(createUserSchema, 'body'), adminController.createUser);

/**
 * @swagger
 * /api/admin/users:
 *   get:
 *     summary: Get all users with filtering and pagination
 *     tags: [Admin]
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
 *         description: Users retrieved successfully
 */
router.get('/users', validate(filterSchema, 'query'), adminController.getUsers);

/**
 * @swagger
 * /api/admin/users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User retrieved successfully
 */
router.get('/users/:id', adminController.getUserById);

/**
 * @swagger
 * /api/admin/users/{id}:
 *   put:
 *     summary: Update user
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               address:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [ADMIN, STORE_OWNER, NORMAL_USER]
 *     responses:
 *       200:
 *         description: User updated successfully
 */
router.put('/users/:id', validate(updateUserSchema, 'body'), adminController.updateUser);

/**
 * @swagger
 * /api/admin/users/{id}:
 *   delete:
 *     summary: Delete user
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 */
router.delete('/users/:id', adminController.deleteUser);

// Stores routes
/**
 * @swagger
 * /api/admin/stores:
 *   post:
 *     summary: Create a new store
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - address
 *               - storeOwnerId
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               address:
 *                 type: string
 *               storeOwnerId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Store created successfully
 */
router.post('/stores', validate(createStoreSchema, 'body'), adminController.createStore);

/**
 * @swagger
 * /api/admin/stores:
 *   get:
 *     summary: Get all stores with filtering and pagination
 *     tags: [Admin]
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
 *         description: Stores retrieved successfully
 */
router.get('/stores', validate(filterSchema, 'query'), adminController.getStores);

/**
 * @swagger
 * /api/admin/stores/{id}:
 *   get:
 *     summary: Get store by ID
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Store retrieved successfully
 */
router.get('/stores/:id', adminController.getStoreById);

/**
 * @swagger
 * /api/admin/stores/{id}:
 *   put:
 *     summary: Update store
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       200:
 *         description: Store updated successfully
 */
router.put('/stores/:id', validate(updateStoreSchema, 'body'), adminController.updateStore);

/**
 * @swagger
 * /api/admin/stores/{id}:
 *   delete:
 *     summary: Delete store
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Store deleted successfully
 */
router.delete('/stores/:id', adminController.deleteStore);

export default router;
