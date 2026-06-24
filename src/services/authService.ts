import apiClient from './apiClient';
import {
  AuthResponse,
  LoginFormData,
  SignupFormData,
  ChangePasswordFormData,
} from '@/types';
import { MOCK_CREDENTIALS, MOCK_USERS } from '@/constants/mockData';

class AuthService {
  async login(credentials: LoginFormData): Promise<AuthResponse> {
    try {
      // Mock API call - Replace with real API
      const mockCred = MOCK_CREDENTIALS[0];
      if (credentials.email === mockCred.email && credentials.password === mockCred.password) {
        return {
          token: 'mock-jwt-token-' + Date.now(),
          user: MOCK_USERS[0], // Admin user
        };
      }

      // Try other mock credentials
      const user = MOCK_USERS.find(u => u.email === credentials.email);
      if (user) {
        return {
          token: 'mock-jwt-token-' + Date.now(),
          user,
        };
      }

      throw new Error('Invalid credentials');

      // Real API call (uncomment when backend is ready):
      // const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
      // return response.data;
    } catch (error) {
      throw error;
    }
  }

  async signup(data: SignupFormData): Promise<AuthResponse> {
    try {
      // Mock API call - Replace with real API
      const newUser = {
        id: String(MOCK_USERS.length + 1),
        ...data,
        role: 'NORMAL_USER' as const,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      return {
        token: 'mock-jwt-token-' + Date.now(),
        user: newUser,
      };

      // Real API call (uncomment when backend is ready):
      // const response = await apiClient.post<AuthResponse>('/auth/signup', data);
      // return response.data;
    } catch (error) {
      throw error;
    }
  }

  async changePassword(data: ChangePasswordFormData): Promise<void> {
    try {
      // Mock API call
      // Real API call (uncomment when backend is ready):
      // await apiClient.post('/auth/change-password', data);
    } catch (error) {
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      // Mock API call
      // Real API call (uncomment when backend is ready):
      // await apiClient.post('/auth/logout');
    } catch (error) {
      throw error;
    }
  }
}

export default new AuthService();
