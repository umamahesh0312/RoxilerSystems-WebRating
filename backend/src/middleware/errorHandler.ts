import { Request, Response, NextFunction } from 'express';
import { ResponseHandler, logger } from '@utils/index';

export class AppError extends Error {
  constructor(
    public statusCode: number,
    message: string,
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error('Error occurred', err);

  if (err instanceof AppError) {
    return ResponseHandler.error(res, err.message, err.statusCode);
  }

  if (err.name === 'ZodError') {
    return ResponseHandler.error(res, 'Validation error', 400);
  }

  if (err.message.includes('Unique constraint')) {
    return ResponseHandler.error(res, 'A record with this value already exists', 409);
  }

  if (err.message.includes('Record to delete does not exist')) {
    return ResponseHandler.error(res, 'Resource not found', 404);
  }

  return ResponseHandler.error(res, 'Internal server error', 500);
};
