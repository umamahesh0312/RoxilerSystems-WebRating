import { Request, Response, NextFunction } from 'express';
import { userService, storeService, ratingService } from '@services/index';
import { ResponseHandler, logger } from '@utils/index';
import { CreateUserDTO, UpdateUserDTO, UserFilterDTO } from '../types/dto';

export class AdminController {
  // Dashboard
  async getDashboard(req: Request, res: Response, next: NextFunction) {
    try {
      const [totalUsers, totalStores, totalRatings] = await Promise.all([
        userService.getUserCount(),
        storeService.getStoreCount(),
        ratingService.getRatingCount(),
      ]);

      const data = {
        totalUsers,
        totalStores,
        totalRatings,
      };

      return ResponseHandler.success(res, data, 'Dashboard data retrieved');
    } catch (error) {
      logger.error('Get dashboard controller error', error);
      next(error);
    }
  }

  // Users management
  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const data: CreateUserDTO = req.body;
      const user = await userService.createUser(data);

      return ResponseHandler.success(res, user, 'User created successfully', 201);
    } catch (error) {
      logger.error('Create user controller error', error);
      next(error);
    }
  }

  async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const filters: UserFilterDTO = {
        page: req.query.page ? parseInt(req.query.page as string) : 1,
        pageSize: req.query.pageSize ? parseInt(req.query.pageSize as string) : 10,
        search: req.query.search as string,
        sortBy: (req.query.sortBy as string) || 'createdAt',
        sortOrder: (req.query.sortOrder as 'asc' | 'desc') || 'asc',
      };

      const { data, total } = await userService.getUsers(filters);
      const totalPages = Math.ceil(total / filters.pageSize!);

      return ResponseHandler.paginated(res, data, filters.page!, filters.pageSize!, total, 'Users retrieved successfully');
    } catch (error) {
      logger.error('Get users controller error', error);
      next(error);
    }
  }

  async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const user = await userService.getUserById(id);

      if (!user) {
        return ResponseHandler.error(res, 'User not found', 404);
      }

      return ResponseHandler.success(res, user, 'User retrieved successfully');
    } catch (error) {
      logger.error('Get user by id controller error', error);
      next(error);
    }
  }

  async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const data: UpdateUserDTO = req.body;

      const user = await userService.updateUser(id, data);

      return ResponseHandler.success(res, user, 'User updated successfully');
    } catch (error) {
      logger.error('Update user controller error', error);
      next(error);
    }
  }

  async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await userService.deleteUser(id);

      return ResponseHandler.success(res, null, 'User deleted successfully');
    } catch (error) {
      logger.error('Delete user controller error', error);
      next(error);
    }
  }

  // Stores management
  async createStore(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;
      const store = await storeService.createStore(data);

      return ResponseHandler.success(res, store, 'Store created successfully', 201);
    } catch (error) {
      logger.error('Create store controller error', error);
      next(error);
    }
  }

  async getStores(req: Request, res: Response, next: NextFunction) {
    try {
      const filters = {
        page: req.query.page ? parseInt(req.query.page as string) : 1,
        pageSize: req.query.pageSize ? parseInt(req.query.pageSize as string) : 10,
        search: req.query.search as string,
        sortBy: (req.query.sortBy as string) || 'createdAt',
        sortOrder: (req.query.sortOrder as 'asc' | 'desc') || 'asc',
      };

      const { data, total } = await storeService.getStores(filters);

      return ResponseHandler.paginated(res, data, filters.page, filters.pageSize, total, 'Stores retrieved successfully');
    } catch (error) {
      logger.error('Get stores controller error', error);
      next(error);
    }
  }

  async getStoreById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const store = await storeService.getStoreById(id);

      if (!store) {
        return ResponseHandler.error(res, 'Store not found', 404);
      }

      return ResponseHandler.success(res, store, 'Store retrieved successfully');
    } catch (error) {
      logger.error('Get store by id controller error', error);
      next(error);
    }
  }

  async updateStore(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const data = req.body;

      const store = await storeService.updateStore(id, data);

      return ResponseHandler.success(res, store, 'Store updated successfully');
    } catch (error) {
      logger.error('Update store controller error', error);
      next(error);
    }
  }

  async deleteStore(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await storeService.deleteStore(id);

      return ResponseHandler.success(res, null, 'Store deleted successfully');
    } catch (error) {
      logger.error('Delete store controller error', error);
      next(error);
    }
  }
}

export const adminController = new AdminController();
