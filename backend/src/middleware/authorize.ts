import { Request, Response, NextFunction } from 'express';
import { ResponseHandler, logger } from '@utils/index';
import { UserRole } from '../types';

export const authorize = (...allowedRoles: UserRole[]) => {
  return (
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    try {
      if (!req.user) {
        logger.warn('User not authenticated');

        ResponseHandler.error(res, 'Unauthorized', 401);
        return;
      }

      if (!allowedRoles.includes(req.user.role)) {
        logger.warn(
          `User ${req.user.email} attempted to access restricted resource. Role: ${req.user.role}`
        );

        ResponseHandler.error(
          res,
          'Forbidden: Insufficient permissions',
          403
        );
        return;
      }

      logger.debug(`Authorization passed for user: ${req.user.email}`);

      next();
    } catch (error) {
      logger.error('Authorization error', error);

      ResponseHandler.error(res, 'Forbidden', 403);
      return;
    }
  };
};