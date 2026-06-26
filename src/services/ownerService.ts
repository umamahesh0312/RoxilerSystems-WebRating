import apiClient from './apiClient';
import { BackendApiResponse, BackendPaginatedResponse } from './authService';
import { Store, PaginatedResponse, Rating } from '@/types';

class OwnerService {
  async getDashboard(): Promise<{ averageRating: number; totalRatings: number; storeCount: number }> {
    const response = await apiClient.get<BackendApiResponse<any>>('/owner/dashboard');
    return response.data.data;
  }

  async getStores(): Promise<Store[]> {
    const response = await apiClient.get<BackendApiResponse<any[]>>('/owner/stores');
    return (response.data.data || []).map((store: any) => ({
      id: store.id,
      storeName: store.name,
      name: store.name,
      email: store.email,
      address: store.address,
      ownerId: store.ownerId,
      averageRating: store.averageRating || 0,
      totalRatings: store.totalRatings || 0,
      createdAt: store.createdAt,
      updatedAt: store.updatedAt,
    }));
  }

  async getRatings(storeId: string, page: number = 1, pageSize: number = 10): Promise<PaginatedResponse<Rating>> {
    const response = await apiClient.get<BackendPaginatedResponse<any>>('/owner/ratings', {
      params: { storeId, page, pageSize },
    });
    const { data, pagination } = response.data;
    return {
      data: data.map((rating: any) => ({
        id: rating.id || '',
        storeId,
        userId: '',
        score: rating.rating,
        createdAt: rating.submittedAt || rating.createdAt,
        updatedAt: rating.createdAt || rating.updatedAt,
        userName: rating.userName,
        userEmail: rating.userEmail,
      })),
      total: pagination.total,
      page: pagination.page,
      pageSize: pagination.pageSize,
      totalPages: pagination.totalPages,
    };
  }
}

export default new OwnerService();
