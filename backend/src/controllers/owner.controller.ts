import { Request, Response, NextFunction } from 'express';
import { storeService, ratingService } from '@services/index';
import { ResponseHandler, logger } from '@utils/index';

export class OwnerController {
  // Get store owner dashboard
  async getDashboard(req: Request, res: Response, next: NextFunction) {
    try {
      const ownerId = req.user?.id;
      if (!ownerId) {
        return ResponseHandler.error(res, 'User not authenticated', 401);
      }

      const stores = await storeService.getStoresByOwner(ownerId);

      if (stores.length === 0) {
        return ResponseHandler.success(
          res,
          {
            averageRating: 0,
            totalRatings: 0,
            storeCount: 0,
          },
          'Dashboard data retrieved'
        );
      }

      // Calculate overall stats
      let totalRatings = 0;
      let totalRatingScore = 0;

      for (const store of stores) {
        totalRatings += store.totalRatings;
        totalRatingScore += store.averageRating * store.totalRatings;
      }

      const averageRating = totalRatings > 0 ? parseFloat((totalRatingScore / totalRatings).toFixed(2)) : 0;

      const data = {
        averageRating,
        totalRatings,
        storeCount: stores.length,
      };

      return ResponseHandler.success(res, data, 'Dashboard data retrieved');
    } catch (error) {
      logger.error('Get dashboard controller error', error);
      next(error);
    }
  }

  // Get store owner's stores
  async getStores(req: Request, res: Response, next: NextFunction) {
    try {
      const ownerId = req.user?.id;
      if (!ownerId) {
        return ResponseHandler.error(res, 'User not authenticated', 401);
      }

      const stores = await storeService.getStoresByOwner(ownerId);

      return ResponseHandler.success(res, stores, 'Stores retrieved successfully');
    } catch (error) {
      logger.error('Get stores controller error', error);
      next(error);
    }
  }

  // Get ratings for owner's stores
  async getRatings(req: Request, res: Response, next: NextFunction) {
    try {
      const ownerId = req.user?.id;
      if (!ownerId) {
        return ResponseHandler.error(res, 'User not authenticated', 401);
      }

      const page = req.query.page ? parseInt(req.query.page as string) : 1;
      const pageSize = req.query.pageSize ? parseInt(req.query.pageSize as string) : 10;
      const storeId = req.query.storeId as string;

      if (!storeId) {
        return ResponseHandler.error(res, 'Store ID is required', 400);
      }

      // Verify the store belongs to the owner
      const store = await storeService.getStoreById(storeId);
      if (!store || store.ownerId !== ownerId) {
        return ResponseHandler.error(res, 'Store not found or unauthorized', 404);
      }

      const { data, total } = await ratingService.getRatingsByStore(storeId, page, pageSize);

      // Transform data to match frontend expectations
      const transformedData = data.map((rating) => ({
        userName: rating.user.name,
        userEmail: rating.user.email,
        rating: rating.rating,
        submittedAt: rating.createdAt,
      }));

      return ResponseHandler.paginated(res, transformedData, page, pageSize, total, 'Ratings retrieved successfully');
    } catch (error) {
      logger.error('Get ratings controller error', error);
      next(error);
    }
  }
}

export const ownerController = new OwnerController();
