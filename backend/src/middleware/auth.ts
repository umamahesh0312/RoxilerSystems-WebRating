import { Request, Response, NextFunction } from 'express';
import { JwtUtils, ResponseHandler, logger } from '@utils/index';
import { IJwtPayload } from '@types/index';

declare global {
  namespace Express {
    interface Request {
      user?: IJwtPayload;
    }
  }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      logger.warn('Missing or invalid authorization header');
      return ResponseHandler.error(res, 'Unauthorized: Missing or invalid token', 401);
    }

    const token = authHeader.substring(7);

    const decoded = JwtUtils.verifyToken(token);
    req.user = decoded;

    logger.debug(`User authenticated: ${decoded.email}`);
    next();
  } catch (error) {
    logger.error('Authentication error', error);
    return ResponseHandler.error(res, 'Unauthorized: Invalid token', 401);
  }
};
