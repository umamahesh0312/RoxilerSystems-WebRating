export interface IApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export interface IPaginatedResponse<T> {
  success: boolean;
  message: string;
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

export enum UserRole {
  ADMIN = 'ADMIN',
  STORE_OWNER = 'STORE_OWNER',
  NORMAL_USER = 'NORMAL_USER',
}

export interface IJwtPayload {
  id: string;
  email: string;
  role: UserRole;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  address: string | null;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export interface IStore {
  id: string;
  name: string;
  email: string;
  address: string;
  ownerId: string;
  averageRating: number;
  totalRatings: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IRating {
  id: string;
  userId: string;
  storeId: string;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IStoreWithUserRating extends IStore {
  userRating?: number | null;
}
