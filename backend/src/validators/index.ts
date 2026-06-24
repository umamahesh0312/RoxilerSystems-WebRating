import { z } from 'zod';

// Auth Validators
export const registerSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters').max(60, 'Name must not exceed 60 characters'),
  email: z.string().email('Invalid email format'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(16, 'Password must not exceed 16 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character'),
  address: z.string().max(400, 'Address must not exceed 400 characters').optional(),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(1, 'Password is required'),
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z
    .string()
    .min(8, 'New password must be at least 8 characters')
    .max(16, 'New password must not exceed 16 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character'),
});

// User Validators
export const createUserSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters').max(60, 'Name must not exceed 60 characters'),
  email: z.string().email('Invalid email format'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(16, 'Password must not exceed 16 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character'),
  address: z.string().max(400, 'Address must not exceed 400 characters').optional(),
  role: z.enum(['ADMIN', 'STORE_OWNER', 'NORMAL_USER']).optional(),
});

export const updateUserSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters').max(60, 'Name must not exceed 60 characters').optional(),
  email: z.string().email('Invalid email format').optional(),
  address: z.string().max(400, 'Address must not exceed 400 characters').optional(),
  role: z.enum(['ADMIN', 'STORE_OWNER', 'NORMAL_USER']).optional(),
});

// Store Validators
export const createStoreSchema = z.object({
  name: z.string().min(3, 'Store name must be at least 3 characters').max(60, 'Store name must not exceed 60 characters'),
  email: z.string().email('Invalid email format'),
  address: z.string().min(1, 'Address is required').max(400, 'Address must not exceed 400 characters'),
  storeOwnerId: z.string().uuid('Invalid store owner ID'),
});

export const updateStoreSchema = z.object({
  name: z.string().min(3, 'Store name must be at least 3 characters').max(60, 'Store name must not exceed 60 characters').optional(),
  email: z.string().email('Invalid email format').optional(),
  address: z.string().min(1, 'Address is required').max(400, 'Address must not exceed 400 characters').optional(),
});

// Rating Validators
export const createRatingSchema = z.object({
  storeId: z.string().uuid('Invalid store ID'),
  rating: z.number().min(1, 'Rating must be at least 1').max(5, 'Rating must not exceed 5').int('Rating must be an integer'),
});

export const updateRatingSchema = z.object({
  rating: z.number().min(1, 'Rating must be at least 1').max(5, 'Rating must not exceed 5').int('Rating must be an integer'),
});

// Pagination Validators
export const paginationSchema = z.object({
  page: z.coerce.number().min(1, 'Page must be at least 1').default(1),
  pageSize: z.coerce.number().min(1, 'Page size must be at least 1').max(100, 'Page size must not exceed 100').default(10),
});

export const filterSchema = z.object({
  page: z.coerce.number().min(1, 'Page must be at least 1').default(1),
  pageSize: z.coerce.number().min(1, 'Page size must be at least 1').max(100, 'Page size must not exceed 100').default(10),
  search: z.string().optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).default('asc'),
});
