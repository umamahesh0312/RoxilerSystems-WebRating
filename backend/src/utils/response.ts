import { Response } from 'express';
import { IApiResponse, IPaginatedResponse } from '@types/index';

export class ResponseHandler {
  static success<T>(res: Response, data: T, message: string = 'Success', statusCode: number = 200) {
    const response: IApiResponse<T> = {
      success: true,
      message,
      data,
    };
    return res.status(statusCode).json(response);
  }

  static paginated<T>(
    res: Response,
    data: T[],
    page: number,
    pageSize: number,
    total: number,
    message: string = 'Data retrieved successfully',
    statusCode: number = 200
  ) {
    const response: IPaginatedResponse<T> = {
      success: true,
      message,
      data,
      pagination: {
        page,
        pageSize,
        total,
        totalPages: Math.ceil(total / pageSize),
      },
    };
    return res.status(statusCode).json(response);
  }

  static error(res: Response, error: string, statusCode: number = 400) {
    const response: IApiResponse<null> = {
      success: false,
      message: error,
      error,
    };
    return res.status(statusCode).json(response);
  }
}
