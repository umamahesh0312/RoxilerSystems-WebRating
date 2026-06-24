import apiClient from './apiClient';
import { User, FilterOptions, PaginatedResponse, AddUserFormData } from '@/types';
import { MOCK_USERS } from '@/constants/mockData';

class AdminService {
  async getUsers(filters?: FilterOptions): Promise<PaginatedResponse<User>> {
    try {
      // Mock API call
      const filteredUsers = MOCK_USERS.filter(user => {
        if (filters?.search) {
          const search = filters.search.toLowerCase();
          return (
            user.name.toLowerCase().includes(search) ||
            user.email.toLowerCase().includes(search)
          );
        }
        return true;
      });

      const page = filters?.page || 1;
      const pageSize = filters?.pageSize || 10;
      const start = (page - 1) * pageSize;
      const end = start + pageSize;

      return {
        data: filteredUsers.slice(start, end),
        total: filteredUsers.length,
        page,
        pageSize,
        totalPages: Math.ceil(filteredUsers.length / pageSize),
      };

      // Real API call (uncomment when backend is ready):
      // const response = await apiClient.get<PaginatedResponse<User>>('/admin/users', {
      //   params: filters,
      // });
      // return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getUserById(id: string): Promise<User> {
    try {
      // Mock API call
      const user = MOCK_USERS.find(u => u.id === id);
      if (!user) throw new Error('User not found');
      return user;

      // Real API call (uncomment when backend is ready):
      // const response = await apiClient.get<User>(`/admin/users/${id}`);
      // return response.data;
    } catch (error) {
      throw error;
    }
  }

  async addUser(data: AddUserFormData): Promise<User> {
    try {
      // Mock API call
      const newUser: User = {
        id: String(MOCK_USERS.length + 1),
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      return newUser;

      // Real API call (uncomment when backend is ready):
      // const response = await apiClient.post<User>('/admin/users', data);
      // return response.data;
    } catch (error) {
      throw error;
    }
  }

  async updateUser(id: string, data: Partial<User>): Promise<User> {
    try {
      // Mock API call
      // Real API call (uncomment when backend is ready):
      // const response = await apiClient.put<User>(`/admin/users/${id}`, data);
      // return response.data;
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(id: string): Promise<void> {
    try {
      // Mock API call
      // Real API call (uncomment when backend is ready):
      // await apiClient.delete(`/admin/users/${id}`);
    } catch (error) {
      throw error;
    }
  }
}

export default new AdminService();
