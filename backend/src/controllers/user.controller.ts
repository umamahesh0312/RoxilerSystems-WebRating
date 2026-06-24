import { Request, Response, NextFunction } from 'express';
import { storeService, ratingService } from '@services/index';
import { ResponseHandler, logger } from '@utils/index';
import { CreateRatingDTO, UpdateRatingDTO, StoreFilterDTO } from '@types/dto';

export class UserController {
  // Get all stores with user ratings
  async getStores(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id;
      const filters: StoreFilterDTO = {
        page: req.query.page ? parseInt(req.query.page as string) : 1,
        pageSize: req.query.pageSize ? parseInt(req.query.pageSize as string) : 10,
        search: req.query.search as string,
        sortBy: (req.query.sortBy as string) || 'createdAt',
        sortOrder: (req.query.sortOrder as 'asc' | 'desc') || 'asc',
      };

      const { data, total } = await storeService.getStoresForUser(filters, userId);

      return ResponseHandler.paginated(res, data, filters.page!, filters.pageSize!, total, 'Stores retrieved successfully');
    } catch (error) {
      logger.error('Get stores controller error', error);
      next(error);
    }
  }

  // Submit a rating
  async submitRating(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return ResponseHandler.error(res, 'User not authenticated', 401);
      }

      const data: CreateRatingDTO = req.body;
      const rating = await ratingService.submitRating(userId, data);

      return ResponseHandler.success(res, rating, 'Rating submitted successfully', 201);
    } catch (error) {
      logger.error('Submit rating controller error', error);
      next(error);
    }
  }

  // Update a rating
  async updateRating(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return ResponseHandler.error(res, 'User not authenticated', 401);
      }

      const { storeId } = req.params;
      const data: UpdateRatingDTO = req.body;

      const rating = await ratingService.updateRating(userId, storeId, data);

      return ResponseHandler.success(res, rating, 'Rating updated successfully');
    } catch (error) {
      logger.error('Update rating controller error', error);
      next(error);
    }
  }

  // Get user's rating for a store
  async getUserRatingForStore(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return ResponseHandler.error(res, 'User not authenticated', 401);
      }

      const { storeId } = req.params;
      const rating = await ratingService.getUserRatingForStore(userId, storeId);

      return ResponseHandler.success(res, rating, 'Rating retrieved successfully');
    } catch (error) {
      logger.error('Get user rating for store controller error', error);
      next(error);
    }
  }

  // Get user's ratings
  async getUserRatings(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return ResponseHandler.error(res, 'User not authenticated', 401);
      }

      const page = req.query.page ? parseInt(req.query.page as string) : 1;
      const pageSize = req.query.pageSize ? parseInt(req.query.pageSize as string) : 10;

      const { data, total } = await ratingService.getRatingsByUser(userId, page, pageSize);

      return ResponseHandler.paginated(res, data, page, pageSize, total, 'User ratings retrieved successfully');
    } catch (error) {
      logger.error('Get user ratings controller error', error);
      next(error);
    }
  }
}

export const userController = new UserController();
