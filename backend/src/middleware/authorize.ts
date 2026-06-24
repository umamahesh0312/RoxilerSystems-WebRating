import { Request, Response, NextFunction } from 'express';
import { ResponseHandler, logger } from '@utils/index';
import { UserRole } from '@types/index';

export const authorize = (...allowedRoles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        logger.warn('User not authenticated');
        return ResponseHandler.error(res, 'Unauthorized', 401);
      }

      if (!allowedRoles.includes(req.user.role)) {
        logger.warn(`User ${req.user.email} attempted to access restricted resource. Role: ${req.user.role}`);
        return ResponseHandler.error(res, 'Forbidden: Insufficient permissions', 403);
      }

      logger.debug(`Authorization passed for user: ${req.user.email}`);
      next();
    } catch (error) {
      logger.error('Authorization error', error);
      return ResponseHandler.error(res, 'Forbidden', 403);
    }
  };
};
