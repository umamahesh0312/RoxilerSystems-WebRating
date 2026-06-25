import { UserRole } from './index';

export interface RegisterDTO {
  name: string;
  email: string;
  password: string;
  address?: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface ChangePasswordDTO {
  currentPassword: string;
  newPassword: string;
}

export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
  address?: string;
  role?: UserRole;
}

export interface UpdateUserDTO {
  name?: string;
  email?: string;
  address?: string;
  role?: UserRole;
}

export interface CreateStoreDTO {
  name: string;
  email: string;
  address: string;
  storeOwnerId: string;
}

export interface UpdateStoreDTO {
  name?: string;
  email?: string;
  address?: string;
}

export interface CreateRatingDTO {
  storeId: string;
  rating: number;
}

export interface UpdateRatingDTO {
  rating: number;
}

export interface RatingFilterDTO {
  page?: number;
  pageSize?: number;
}

export interface UserFilterDTO {
  page?: number;
  pageSize?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface StoreFilterDTO {
  page?: number;
  pageSize?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}
