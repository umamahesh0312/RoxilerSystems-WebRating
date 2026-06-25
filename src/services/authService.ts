import apiClient from './apiClient';
import {
  AuthResponse,
  LoginFormData,
  SignupFormData,
  ChangePasswordFormData,
  User,
} from '@/types';
import { UserRole } from '@/types';

interface BackendAuthResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    user: {
      id: string;
      name: string;
      email: string;
      role: string;
      address: string | null;
      createdAt: string;
      updatedAt: string;
    };
  };
}

interface BackendApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

interface BackendPaginatedResponse<T> {
  success: boolean;
  message: string;
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

function mapRole(role: string): UserRole {
  switch (role) {
    case 'ADMIN':
      return UserRole.SYSTEM_ADMIN;
    case 'STORE_OWNER':
      return UserRole.STORE_OWNER;
    case 'NORMAL_USER':
      return UserRole.NORMAL_USER;
    default:
      return UserRole.NORMAL_USER;
  }
}

function mapUser(backendUser: {
  id: string;
  name: string;
  email: string;
  role: string;
  address: string | null;
  createdAt: string;
  updatedAt: string;
}): User {
  return {
    id: backendUser.id,
    name: backendUser.name,
    email: backendUser.email,
    role: mapRole(backendUser.role),
    address: backendUser.address || '',
    createdAt: backendUser.createdAt,
    updatedAt: backendUser.updatedAt,
  };
}

function mapStore(backendStore: any) {
  return {
    id: backendStore.id,
    storeName: backendStore.name,
    name: backendStore.name,
    email: backendStore.email,
    address: backendStore.address,
    ownerId: backendStore.ownerId || '',
    averageRating: backendStore.averageRating || 0,
    totalRatings: backendStore.totalRatings || 0,
    createdAt: backendStore.createdAt,
    updatedAt: backendStore.updatedAt,
  };
}

class AuthService {
  async login(credentials: LoginFormData): Promise<AuthResponse> {
    const response = await apiClient.post<BackendAuthResponse>('/auth/login', {
      email: credentials.email,
      password: credentials.password,
    });
    const { token, user } = response.data.data;
    return {
      token,
      user: mapUser(user),
    };
  }

  async signup(data: SignupFormData): Promise<AuthResponse> {
    const response = await apiClient.post<BackendAuthResponse>('/auth/register', {
      name: data.name,
      email: data.email,
      password: data.password,
      address: data.address,
    });
    const { token, user } = response.data.data;
    return {
      token,
      user: mapUser(user),
    };
  }

  async changePassword(data: ChangePasswordFormData): Promise<void> {
    await apiClient.put('/auth/change-password', {
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    });
  }

  async logout(): Promise<void> {
    // No backend endpoint needed—token invalidation is client-side
  }
}

export { mapUser, mapRole, mapStore };
export type { BackendApiResponse, BackendPaginatedResponse };
export default new AuthService();
