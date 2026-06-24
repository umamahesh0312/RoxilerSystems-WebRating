import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  rememberMe: z.boolean().optional(),
});

export const signupSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(60, 'Name must be at most 60 characters'),
  email: z.string().email('Invalid email address'),
  address: z.string().max(400, 'Address must be at most 400 characters').optional(),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(16, 'Password must be at most 16 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character'),
});

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(8, 'Password must be at least 8 characters'),
    newPassword: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .max(16, 'Password must be at most 16 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const addUserSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(60, 'Name must be at most 60 characters'),
  email: z.string().email('Invalid email address'),
  address: z.string().max(400, 'Address must be at most 400 characters').optional(),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(16, 'Password must be at most 16 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character'),
  role: z.enum(['SYSTEM_ADMIN', 'NORMAL_USER', 'STORE_OWNER']),
});

export const addStoreSchema = z.object({
  storeName: z.string().min(2, 'Store name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address'),
  address: z.string().min(5, 'Address must be at least 5 characters').max(400),
  storeOwnerId: z.string().min(1, 'Please select a store owner'),
});

export const ratingSchema = z.object({
  storeId: z.string().min(1, 'Store ID is required'),
  score: z.number().min(1, 'Rating must be at least 1').max(5, 'Rating must be at most 5'),
});
