import apiClient from './apiClient';
import { Store, StoreFilterOptions, PaginatedResponse, AddStoreFormData } from '@/types';
import { MOCK_STORES } from '@/constants/mockData';

class StoreService {
  async getStores(filters?: StoreFilterOptions): Promise<PaginatedResponse<Store>> {
    try {
      // Mock API call
      let filteredStores = MOCK_STORES;

      if (filters?.search) {
        const search = filters.search.toLowerCase();
        filteredStores = filteredStores.filter(
          store =>
            store.storeName.toLowerCase().includes(search) ||
            store.email.toLowerCase().includes(search) ||
            store.address.toLowerCase().includes(search)
        );
      }

      // Sort
      if (filters?.sortBy) {
        filteredStores.sort((a, b) => {
          const aValue = a[filters.sortBy as keyof Store];
          const bValue = b[filters.sortBy as keyof Store];
          const comparison = aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
          return filters.sortOrder === 'desc' ? -comparison : comparison;
        });
      }

      const page = filters?.page || 1;
      const pageSize = filters?.pageSize || 10;
      const start = (page - 1) * pageSize;
      const end = start + pageSize;

      return {
        data: filteredStores.slice(start, end),
        total: filteredStores.length,
        page,
        pageSize,
        totalPages: Math.ceil(filteredStores.length / pageSize),
      };

      // Real API call (uncomment when backend is ready):
      // const response = await apiClient.get<PaginatedResponse<Store>>('/admin/stores', {
      //   params: filters,
      // });
      // return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getStoreById(id: string): Promise<Store> {
    try {
      // Mock API call
      const store = MOCK_STORES.find(s => s.id === id);
      if (!store) throw new Error('Store not found');
      return store;

      // Real API call (uncomment when backend is ready):
      // const response = await apiClient.get<Store>(`/admin/stores/${id}`);
      // return response.data;
    } catch (error) {
      throw error;
    }
  }

  async addStore(data: AddStoreFormData): Promise<Store> {
    try {
      // Mock API call
      const newStore: Store = {
        id: String(MOCK_STORES.length + 1),
        ...data,
        ownerId: data.storeOwnerId,
        averageRating: 0,
        totalRatings: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      return newStore;

      // Real API call (uncomment when backend is ready):
      // const response = await apiClient.post<Store>('/admin/stores', data);
      // return response.data;
    } catch (error) {
      throw error;
    }
  }

  async updateStore(id: string, data: Partial<Store>): Promise<Store> {
    try {
      // Mock API call
      // Real API call (uncomment when backend is ready):
      // const response = await apiClient.put<Store>(`/admin/stores/${id}`, data);
      // return response.data;
    } catch (error) {
      throw error;
    }
  }

  async deleteStore(id: string): Promise<void> {
    try {
      // Mock API call
      // Real API call (uncomment when backend is ready):
      // await apiClient.delete(`/admin/stores/${id}`);
    } catch (error) {
      throw error;
    }
  }

  async getStoresByOwner(ownerId: string): Promise<Store[]> {
    try {
      // Mock API call
      return MOCK_STORES.filter(store => store.ownerId === ownerId);

      // Real API call (uncomment when backend is ready):
      // const response = await apiClient.get<Store[]>(`/stores/owner/${ownerId}`);
      // return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default new StoreService();
