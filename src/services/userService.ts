import apiClient from './apiClient';
import { User, ChangePasswordFormData } from '@/types';

class UserService {
  async getUserProfile(): Promise<User> {
    try {
      // Mock API call
      // Real API call (uncomment when backend is ready):
      // const response = await apiClient.get<User>('/users/profile');
      // return response.data;
    } catch (error) {
      throw error;
    }
  }

  async updateProfile(data: Partial<User>): Promise<User> {
    try {
      // Mock API call
      // Real API call (uncomment when backend is ready):
      // const response = await apiClient.put<User>('/users/profile', data);
      // return response.data;
    } catch (error) {
      throw error;
    }
  }

  async changePassword(data: ChangePasswordFormData): Promise<void> {
    try {
      // Mock API call
      // Real API call (uncomment when backend is ready):
      // await apiClient.post('/users/change-password', data);
    } catch (error) {
      throw error;
    }
  }
}

export default new UserService();
