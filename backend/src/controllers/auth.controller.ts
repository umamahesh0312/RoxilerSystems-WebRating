import { Request, Response, NextFunction } from 'express';
import { authService } from '@services/index';
import { ResponseHandler, logger } from '@utils/index';
import { RegisterDTO, LoginDTO, ChangePasswordDTO } from '@types/dto';

export class AuthController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const data: RegisterDTO = req.body;
      const result = await authService.register(data);

      return ResponseHandler.success(res, result, 'Registration successful', 201);
    } catch (error) {
      logger.error('Register controller error', error);
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const data: LoginDTO = req.body;
      const result = await authService.login(data);

      return ResponseHandler.success(res, result, 'Login successful');
    } catch (error) {
      logger.error('Login controller error', error);
      next(error);
    }
  }

  async changePassword(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return ResponseHandler.error(res, 'User not authenticated', 401);
      }

      const data: ChangePasswordDTO = req.body;
      await authService.changePassword(userId, data.currentPassword, data.newPassword);

      return ResponseHandler.success(res, null, 'Password changed successfully');
    } catch (error) {
      logger.error('Change password controller error', error);
      next(error);
    }
  }
}

export const authController = new AuthController();
