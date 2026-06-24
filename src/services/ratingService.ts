import apiClient from './apiClient';
import { Rating, PaginatedResponse } from '@/types';
import { MOCK_RATINGS } from '@/constants/mockData';

interface RatingSubmitData {
  storeId: string;
  userId: string;
  score: number;
}

class RatingService {
  async getRatingsByStore(
    storeId: string,
    page: number = 1,
    pageSize: number = 10
  ): Promise<PaginatedResponse<Rating>> {
    try {
      // Mock API call
      const storeRatings = MOCK_RATINGS.filter(rating => rating.storeId === storeId);

      const start = (page - 1) * pageSize;
      const end = start + pageSize;

      return {
        data: storeRatings.slice(start, end),
        total: storeRatings.length,
        page,
        pageSize,
        totalPages: Math.ceil(storeRatings.length / pageSize),
      };

      // Real API call (uncomment when backend is ready):
      // const response = await apiClient.get<PaginatedResponse<Rating>>(
      //   `/ratings/store/${storeId}`,
      //   { params: { page, pageSize } }
      // );
      // return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getRatingsByUser(
    userId: string,
    page: number = 1,
    pageSize: number = 10
  ): Promise<PaginatedResponse<Rating>> {
    try {
      // Mock API call
      const userRatings = MOCK_RATINGS.filter(rating => rating.userId === userId);

      const start = (page - 1) * pageSize;
      const end = start + pageSize;

      return {
        data: userRatings.slice(start, end),
        total: userRatings.length,
        page,
        pageSize,
        totalPages: Math.ceil(userRatings.length / pageSize),
      };

      // Real API call (uncomment when backend is ready):
      // const response = await apiClient.get<PaginatedResponse<Rating>>(
      //   `/ratings/user/${userId}`,
      //   { params: { page, pageSize } }
      // );
      // return response.data;
    } catch (error) {
      throw error;
    }
  }

  async submitRating(data: RatingSubmitData): Promise<Rating> {
    try {
      // Mock API call
      const newRating: Rating = {
        id: String(MOCK_RATINGS.length + 1),
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      return newRating;

      // Real API call (uncomment when backend is ready):
      // const response = await apiClient.post<Rating>('/ratings', data);
      // return response.data;
    } catch (error) {
      throw error;
    }
  }

  async updateRating(id: string, score: number): Promise<Rating> {
    try {
      // Mock API call
      // Real API call (uncomment when backend is ready):
      // const response = await apiClient.put<Rating>(`/ratings/${id}`, { score });
      // return response.data;
    } catch (error) {
      throw error;
    }
  }

  async deleteRating(id: string): Promise<void> {
    try {
      // Mock API call
      // Real API call (uncomment when backend is ready):
      // await apiClient.delete(`/ratings/${id}`);
    } catch (error) {
      throw error;
    }
  }

  async getUserRatingForStore(userId: string, storeId: string): Promise<Rating | null> {
    try {
      // Mock API call
      const rating = MOCK_RATINGS.find(r => r.userId === userId && r.storeId === storeId);
      return rating || null;

      // Real API call (uncomment when backend is ready):
      // const response = await apiClient.get<Rating | null>(
      //   `/ratings/user/${userId}/store/${storeId}`
      // );
      // return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default new RatingService();
