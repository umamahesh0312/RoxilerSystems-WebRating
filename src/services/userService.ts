import apiClient from './apiClient';
import { User, ChangePasswordFormData, PaginatedResponse } from '@/types';
import { mapUser, BackendApiResponse, BackendPaginatedResponse } from './authService';

class UserService {
  async getUserProfile(): Promise<User> {
    const response = await apiClient.get<BackendApiResponse<any>>('/user/profile');
    return mapUser(response.data.data);
  }

  async getDashboard(): Promise<{ totalStores: number; totalRatings: number }> {
    const response = await apiClient.get<BackendApiResponse<any>>('/user/dashboard');
    return response.data.data;
  }

  async getUserRatings(page: number = 1, pageSize: number = 10): Promise<PaginatedResponse<any>> {
    const response = await apiClient.get<BackendPaginatedResponse<any>>('/user/ratings', {
      params: { page, pageSize },
    });
    const { data, pagination } = response.data;
    return {
      data,
      total: pagination.total,
      page: pagination.page,
      pageSize: pagination.pageSize,
      totalPages: pagination.totalPages,
    };
  }

  async changePassword(data: ChangePasswordFormData): Promise<void> {
    await apiClient.put('/auth/change-password', {
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    });
  }
}

export default new UserService();
