import { userRepository } from '@repositories/index';
import { JwtUtils, PasswordUtils, logger } from '@utils/index';
import { IUser, UserRole } from '@types/index';
import { RegisterDTO, LoginDTO } from '@types/dto';

export class AuthService {
  async register(data: RegisterDTO): Promise<{ token: string; user: IUser }> {
    try {
      // Check if user already exists
      const existingUser = await userRepository.findByEmail(data.email);
      if (existingUser) {
        throw new Error('Email already registered');
      }

      // Hash password
      const hashedPassword = await PasswordUtils.hashPassword(data.password);

      // Create user
      const user = await userRepository.create({
        name: data.name,
        email: data.email,
        password: hashedPassword,
        address: data.address,
        role: 'NORMAL_USER',
      });

      // Generate token
      const token = JwtUtils.generateToken(user.id, user.email, user.role as UserRole);

      logger.info(`User registered: ${user.email}`);

      return { token, user };
    } catch (error) {
      logger.error('Register error', error);
      throw error;
    }
  }

  async login(data: LoginDTO): Promise<{ token: string; user: IUser }> {
    try {
      // Find user by email
      const user = await userRepository.findByEmail(data.email);
      if (!user) {
        throw new Error('Invalid credentials');
      }

      // Verify password
      const isPasswordValid = await PasswordUtils.comparePassword(data.password, user.password);
      if (!isPasswordValid) {
        throw new Error('Invalid credentials');
      }

      // Generate token
      const token = JwtUtils.generateToken(user.id, user.email, user.role as UserRole);

      logger.info(`User logged in: ${user.email}`);

      return { token, user };
    } catch (error) {
      logger.error('Login error', error);
      throw error;
    }
  }

  async changePassword(userId: string, currentPassword: string, newPassword: string): Promise<void> {
    try {
      const user = await userRepository.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }

      const isPasswordValid = await PasswordUtils.comparePassword(currentPassword, user.password);
      if (!isPasswordValid) {
        throw new Error('Current password is incorrect');
      }

      const hashedPassword = await PasswordUtils.hashPassword(newPassword);
      await userRepository.update(userId, { password: hashedPassword } as any);

      logger.info(`Password changed for user: ${user.email}`);
    } catch (error) {
      logger.error('Change password error', error);
      throw error;
    }
  }
}

export const authService = new AuthService();
