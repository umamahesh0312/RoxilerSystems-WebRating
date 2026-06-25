import apiClient from './apiClient';
import { User, FilterOptions, PaginatedResponse, AddUserFormData, Store } from '@/types';
import { mapUser, mapStore, BackendApiResponse, BackendPaginatedResponse } from './authService';

class AdminService {
  async getUsers(filters?: FilterOptions): Promise<PaginatedResponse<User>> {
    const response = await apiClient.get<BackendPaginatedResponse<any>>('/admin/users', {
      params: filters,
    });
    const { data, pagination } = response.data;
    return {
      data: data.map(mapUser),
      total: pagination.total,
      page: pagination.page,
      pageSize: pagination.pageSize,
      totalPages: pagination.totalPages,
    };
  }

  async getUserById(id: string): Promise<User> {
    const response = await apiClient.get<BackendApiResponse<any>>(`/admin/users/${id}`);
    return mapUser(response.data.data);
  }

  async addUser(data: AddUserFormData): Promise<User> {
    const response = await apiClient.post<BackendApiResponse<any>>('/admin/users', data);
    return mapUser(response.data.data);
  }

  async updateUser(id: string, data: Partial<User>): Promise<User> {
    const response = await apiClient.put<BackendApiResponse<any>>(`/admin/users/${id}`, data);
    return mapUser(response.data.data);
  }

  async deleteUser(id: string): Promise<void> {
    await apiClient.delete(`/admin/users/${id}`);
  }

  async getDashboard() {
    const response = await apiClient.get<BackendApiResponse<any>>('/admin/dashboard');
    return response.data.data;
  }

  async getStores(filters?: any): Promise<PaginatedResponse<Store>> {
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
    const response = await apiClient.post<BackendApiResponse<any>>('/admin/stores', data);
    return mapStore(response.data.data);
  }

  async updateStore(id: string, data: Partial<Store>): Promise<Store> {
    const response = await apiClient.put<BackendApiResponse<any>>(`/admin/stores/${id}`, data);
    return mapStore(response.data.data);
  }

  async deleteStore(id: string): Promise<void> {
    await apiClient.delete(`/admin/stores/${id}`);
  }
}

export default new AdminService();
