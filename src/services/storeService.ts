import apiClient from './apiClient';
import { Store, StoreFilterOptions, PaginatedResponse } from '@/types';
import { mapStore, BackendApiResponse, BackendPaginatedResponse } from './authService';

class StoreService {
  async getStores(filters?: StoreFilterOptions): Promise<PaginatedResponse<Store>> {
    const response = await apiClient.get<BackendPaginatedResponse<any>>('/admin/stores', {
      params: filters,
    });
    const { data, pagination } = response.data;
    return {
      data: data.map(mapStore),
      total: pagination.total,
      page: pagination.page,
      pageSize: pagination.pageSize,
      totalPages: pagination.totalPages,
    };
  }

  async getStoreById(id: string): Promise<Store> {
    const response = await apiClient.get<BackendApiResponse<any>>(`/admin/stores/${id}`);
    return mapStore(response.data.data);
  }

  async addStore(data: any): Promise<Store> {
    const payload = {
      name: data.storeName,
      email: data.email,
      address: data.address,
      storeOwnerId: data.storeOwnerId,
    };
    const response = await apiClient.post<BackendApiResponse<any>>('/admin/stores', payload);
    return mapStore(response.data.data);
  }

  async updateStore(id: string, data: Partial<Store>): Promise<Store> {
    const response = await apiClient.put<BackendApiResponse<any>>(`/admin/stores/${id}`, data);
    return mapStore(response.data.data);
  }

  async deleteStore(id: string): Promise<void> {
    await apiClient.delete(`/admin/stores/${id}`);
  }

  async getStoresByOwner(ownerId: string): Promise<Store[]> {
    const response = await apiClient.get<BackendApiResponse<any[]>>(`/owner/stores`);
    return (response.data.data || []).map(mapStore);
  }

  async getStoresForUser(filters?: StoreFilterOptions): Promise<PaginatedResponse<Store>> {
    const response = await apiClient.get<BackendPaginatedResponse<any>>('/stores', {
      params: filters,
    });
    const { data, pagination } = response.data;
    return {
      data: data.map(mapStore),
      total: pagination.total,
      page: pagination.page,
      pageSize: pagination.pageSize,
      totalPages: pagination.totalPages,
    };
  }
}

export default new StoreService();
