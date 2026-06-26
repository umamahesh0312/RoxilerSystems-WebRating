import { userRepository } from '@repositories/index';
import { PasswordUtils, logger } from '@utils/index';
import { IUser, UserRole } from '../types';
import { CreateUserDTO, UpdateUserDTO, UserFilterDTO } from '../types/dto';

export class UserService {
  async createUser(data: CreateUserDTO): Promise<IUser> {
    try {
      // Check if email already exists
      const existingUser = await userRepository.findByEmail(data.email);
      if (existingUser) {
        throw new Error('Email already exists');
      }

      // Hash password
      const hashedPassword = await PasswordUtils.hashPassword(data.password);

      const user = await userRepository.create({
        name: data.name,
        email: data.email,
        password: hashedPassword,
        address: data.address,
        role: data.role || UserRole.NORMAL_USER,
      });

      logger.info(`User created: ${user.email}`);

      return user;
    } catch (error) {
      logger.error('Create user error', error);
      throw error;
    }
  }

  async getUserById(id: string): Promise<IUser | null> {
    try {
      return await userRepository.findById(id);
    } catch (error) {
      logger.error('Get user error', error);
      throw error;
    }
  }

  async getUsers(filters: UserFilterDTO): Promise<{ data: IUser[]; total: number }> {
    try {
      const page = filters.page || 1;
      const pageSize = filters.pageSize || 10;
      const search = filters.search;
      const sortBy = filters.sortBy || 'createdAt';
      const sortOrder = filters.sortOrder || 'asc';
      const role = filters.role;

      return await userRepository.findAll(page, pageSize, search, sortBy, sortOrder, role);
    } catch (error) {
      logger.error('Get users error', error);
      throw error;
    }
  }

  async updateUser(id: string, data: UpdateUserDTO): Promise<IUser> {
    try {
      const user = await userRepository.findById(id);
      if (!user) {
        throw new Error('User not found');
      }

      // Check if new email already exists
      if (data.email && data.email !== user.email) {
        const existingUser = await userRepository.findByEmail(data.email);
        if (existingUser) {
          throw new Error('Email already exists');
        }
      }

      const updatedUser = await userRepository.update(id, data);

      logger.info(`User updated: ${user.email}`);

      return updatedUser;
    } catch (error) {
      logger.error('Update user error', error);
      throw error;
    }
  }

  async deleteUser(id: string): Promise<void> {
    try {
      const user = await userRepository.findById(id);
      if (!user) {
        throw new Error('User not found');
      }

      await userRepository.delete(id);

      logger.info(`User deleted: ${user.email}`);
    } catch (error) {
      logger.error('Delete user error', error);
      throw error;
    }
  }

  async getUserCount(): Promise<number> {
    try {
      return await userRepository.count();
    } catch (error) {
      logger.error('Get user count error', error);
      throw error;
    }
  }
}

export const userService = new UserService();
