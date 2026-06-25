import apiClient from './apiClient';
import { Rating, PaginatedResponse } from '@/types';
import { BackendApiResponse, BackendPaginatedResponse } from './authService';

interface RatingSubmitData {
  storeId: string;
  score: number;
}

function mapRating(backendRating: any): Rating {
  return {
    id: backendRating.id,
    storeId: backendRating.storeId || '',
    userId: backendRating.userId || '',
    score: backendRating.rating ?? backendRating.score ?? 0,
    createdAt: backendRating.createdAt,
    updatedAt: backendRating.updatedAt,
    userName: backendRating.user?.name || backendRating.userName,
    userEmail: backendRating.user?.email || backendRating.userEmail,
    storeName: backendRating.store?.name || backendRating.storeName,
  };
}

class RatingService {
  async getRatingsByStore(
    storeId: string,
    page: number = 1,
    pageSize: number = 10
  ): Promise<PaginatedResponse<Rating>> {
    // Backend returns via owner route — use the admin/store endpoint for direct access
    const response = await apiClient.get<BackendPaginatedResponse<any>>(
      `/owner/ratings`,
      { params: { storeId, page, pageSize } }
    );
    const { data, pagination } = response.data;
    return {
      data: data.map(mapRating),
      total: pagination.total,
      page: pagination.page,
      pageSize: pagination.pageSize,
      totalPages: pagination.totalPages,
    };
  }

  async getRatingsByUser(
    userId: string,
    page: number = 1,
    pageSize: number = 10
  ): Promise<PaginatedResponse<Rating>> {
    const response = await apiClient.get<BackendPaginatedResponse<any>>(
      '/user/ratings',
      { params: { page, pageSize } }
    );
    const { data, pagination } = response.data;
    return {
      data: data.map(mapRating),
      total: pagination.total,
      page: pagination.page,
      pageSize: pagination.pageSize,
      totalPages: pagination.totalPages,
    };
  }

  async submitRating(data: RatingSubmitData): Promise<Rating> {
    const response = await apiClient.post<BackendApiResponse<any>>('/ratings', {
      storeId: data.storeId,
      rating: data.score,
    });
    return mapRating(response.data.data);
  }

  async updateRating(storeId: string, score: number): Promise<Rating> {
    const response = await apiClient.put<BackendApiResponse<any>>(`/ratings/${storeId}`, {
      rating: score,
    });
    return mapRating(response.data.data);
  }

  async deleteRating(storeId: string): Promise<void> {
    await apiClient.delete(`/ratings/${storeId}`);
  }

  async getUserRatingForStore(userId: string, storeId: string): Promise<Rating | null> {
    try {
      const response = await apiClient.get<BackendApiResponse<any>>(`/ratings/${storeId}`);
      return response.data.data ? mapRating(response.data.data) : null;
    } catch {
      return null;
    }
  }
}

export default new RatingService();
