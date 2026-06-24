import { ratingRepository, storeRepository } from '@repositories/index';
import { logger } from '@utils/index';
import { IRating } from '@types/index';
import { CreateRatingDTO, UpdateRatingDTO } from '@types/dto';
import { storeService } from './store.service';

export class RatingService {
  async submitRating(userId: string, data: CreateRatingDTO): Promise<IRating> {
    try {
      // Check if user already rated this store
      const existingRating = await ratingRepository.findByUserAndStore(userId, data.storeId);
      if (existingRating) {
        throw new Error('You have already rated this store');
      }

      // Create rating
      const rating = await ratingRepository.create({
        userId,
        storeId: data.storeId,
        rating: data.rating,
      });

      // Update store ratings
      await storeService.updateStoreRatings(data.storeId);

      logger.info(`Rating submitted: ${userId} for store ${data.storeId}`);

      return rating;
    } catch (error) {
      logger.error('Submit rating error', error);
      throw error;
    }
  }

  async getRatingById(id: string): Promise<IRating | null> {
    try {
      return await ratingRepository.findById(id);
    } catch (error) {
      logger.error('Get rating error', error);
      throw error;
    }
  }

  async getRatingsByStore(storeId: string, page: number = 1, pageSize: number = 10) {
    try {
      return await ratingRepository.findByStoreId(storeId, page, pageSize);
    } catch (error) {
      logger.error('Get ratings by store error', error);
      throw error;
    }
  }

  async getRatingsByUser(userId: string, page: number = 1, pageSize: number = 10) {
    try {
      return await ratingRepository.findByUserId(userId, page, pageSize);
    } catch (error) {
      logger.error('Get ratings by user error', error);
      throw error;
    }
  }

  async updateRating(userId: string, storeId: string, data: UpdateRatingDTO): Promise<IRating> {
    try {
      // Find the rating
      const rating = await ratingRepository.findByUserAndStore(userId, storeId);
      if (!rating) {
        throw new Error('Rating not found');
      }

      // Update rating
      const updatedRating = await ratingRepository.update(rating.id, data.rating);

      // Update store ratings
      await storeService.updateStoreRatings(storeId);

      logger.info(`Rating updated: ${rating.id}`);

      return updatedRating;
    } catch (error) {
      logger.error('Update rating error', error);
      throw error;
    }
  }

  async deleteRating(userId: string, storeId: string): Promise<void> {
    try {
      // Find the rating
      const rating = await ratingRepository.findByUserAndStore(userId, storeId);
      if (!rating) {
        throw new Error('Rating not found');
      }

      // Delete rating
      await ratingRepository.delete(rating.id);

      // Update store ratings
      await storeService.updateStoreRatings(storeId);

      logger.info(`Rating deleted: ${rating.id}`);
    } catch (error) {
      logger.error('Delete rating error', error);
      throw error;
    }
  }

  async getUserRatingForStore(userId: string, storeId: string): Promise<IRating | null> {
    try {
      return await ratingRepository.findByUserAndStore(userId, storeId);
    } catch (error) {
      logger.error('Get user rating for store error', error);
      throw error;
    }
  }

  async getRatingCount(): Promise<number> {
    try {
      return await ratingRepository.count();
    } catch (error) {
      logger.error('Get rating count error', error);
      throw error;
    }
  }
}

export const ratingService = new RatingService();
