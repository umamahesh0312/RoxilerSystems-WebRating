import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';
import { ResponseHandler, logger } from '@utils/index';

export const validate = (schema: ZodSchema, source: 'body' | 'query' | 'params' = 'body') => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const dataToValidate = source === 'body' ? req.body : source === 'query' ? req.query : req.params;

      const result = schema.safeParse(dataToValidate);

      if (!result.success) {
        const errors = result.error.errors.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
        }));

        logger.warn(`Validation failed for ${source}`, errors);
        return ResponseHandler.error(res, `Validation failed: ${JSON.stringify(errors)}`, 400);
      }

      if (source === 'body') {
        req.body = result.data;
      } else if (source === 'query') {
        req.query = result.data as any;
      } else {
        req.params = result.data as any;
      }

      next();
    } catch (error) {
      logger.error('Validation error', error);
      return ResponseHandler.error(res, 'Validation error', 400);
    }
  };
};
