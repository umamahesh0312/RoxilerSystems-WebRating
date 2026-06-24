import { storeRepository, ratingRepository } from '@repositories/index';
import { logger } from '@utils/index';
import { IStore, IStoreWithUserRating } from '@types/index';
import { CreateStoreDTO, UpdateStoreDTO, StoreFilterDTO } from '@types/dto';

export class StoreService {
  async createStore(data: CreateStoreDTO): Promise<IStore> {
    try {
      const store = await storeRepository.create({
        name: data.name,
        email: data.email,
        address: data.address,
        ownerId: data.storeOwnerId,
      });

      logger.info(`Store created: ${store.name}`);

      return store;
    } catch (error) {
      logger.error('Create store error', error);
      throw error;
    }
  }

  async getStoreById(id: string): Promise<IStore | null> {
    try {
      return await storeRepository.findById(id);
    } catch (error) {
      logger.error('Get store error', error);
      throw error;
    }
  }

  async getStores(filters: StoreFilterDTO): Promise<{ data: IStore[]; total: number }> {
    try {
      const page = filters.page || 1;
      const pageSize = filters.pageSize || 10;
      const search = filters.search;
      const sortBy = filters.sortBy || 'createdAt';
      const sortOrder = filters.sortOrder || 'asc';

      return await storeRepository.findAll(page, pageSize, search, sortBy, sortOrder);
    } catch (error) {
      logger.error('Get stores error', error);
      throw error;
    }
  }

  async getStoresForUser(filters: StoreFilterDTO, userId?: string): Promise<{ data: IStoreWithUserRating[]; total: number }> {
    try {
      const { data: stores, total } = await this.getStores(filters);

      // If userId provided, get user's ratings for each store
      if (userId) {
        const storesWithRatings: IStoreWithUserRating[] = await Promise.all(
          stores.map(async (store) => {
            const userRating = await ratingRepository.findByUserAndStore(userId, store.id);
            return {
              ...store,
              userRating: userRating?.rating || null,
            };
          })
        );
        return { data: storesWithRatings, total };
      }

      return { data: stores, total };
    } catch (error) {
      logger.error('Get stores for user error', error);
      throw error;
    }
  }

  async updateStore(id: string, data: UpdateStoreDTO): Promise<IStore> {
    try {
      const store = await storeRepository.findById(id);
      if (!store) {
        throw new Error('Store not found');
      }

      const updatedStore = await storeRepository.update(id, data);

      logger.info(`Store updated: ${store.name}`);

      return updatedStore;
    } catch (error) {
      logger.error('Update store error', error);
      throw error;
    }
  }

  async deleteStore(id: string): Promise<void> {
    try {
      const store = await storeRepository.findById(id);
      if (!store) {
        throw new Error('Store not found');
      }

      await storeRepository.delete(id);

      logger.info(`Store deleted: ${store.name}`);
    } catch (error) {
      logger.error('Delete store error', error);
      throw error;
    }
  }

  async getStoresByOwner(ownerId: string): Promise<IStore[]> {
    try {
      return await storeRepository.findByOwnerId(ownerId);
    } catch (error) {
      logger.error('Get stores by owner error', error);
      throw error;
    }
  }

  async getStoreCount(): Promise<number> {
    try {
      return await storeRepository.count();
    } catch (error) {
      logger.error('Get store count error', error);
      throw error;
    }
  }

  async updateStoreRatings(storeId: string): Promise<void> {
    try {
      const stats = await ratingRepository.getStoreStats(storeId);
      await storeRepository.update(storeId, {
        averageRating: parseFloat(stats.average.toFixed(2)),
        totalRatings: stats.total,
      } as any);

      logger.info(`Store ratings updated: ${storeId}`);
    } catch (error) {
      logger.error('Update store ratings error', error);
      throw error;
    }
  }
}

export const storeService = new StoreService();
