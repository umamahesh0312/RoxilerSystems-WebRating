import apiClient from './apiClient';
import { User, ChangePasswordFormData } from '@/types';
import { mapUser, BackendApiResponse } from './authService';

class UserService {
  async getUserProfile(): Promise<User> {
    // Backend doesn't have a dedicated profile endpoint; use the auth context
    throw new Error('Profile not available');
  }

  async updateProfile(data: Partial<User>): Promise<User> {
    throw new Error('Profile update endpoint not available');
  }

  async changePassword(data: ChangePasswordFormData): Promise<void> {
    await apiClient.put('/auth/change-password', {
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    });
  }
}

export default new UserService();
