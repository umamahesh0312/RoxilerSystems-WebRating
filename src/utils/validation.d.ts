import { z } from 'zod';
export declare const loginSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    rememberMe: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
    rememberMe?: boolean | undefined;
}, {
    email: string;
    password: string;
    rememberMe?: boolean | undefined;
}>;
export declare const signupSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    address: z.ZodOptional<z.ZodString>;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
    email: string;
    password: string;
    address?: string | undefined;
}, {
    name: string;
    email: string;
    password: string;
    address?: string | undefined;
}>;
export declare const changePasswordSchema: z.ZodEffects<z.ZodObject<{
    currentPassword: z.ZodString;
    newPassword: z.ZodString;
    confirmPassword: z.ZodString;
}, "strip", z.ZodTypeAny, {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}, {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}>, {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}, {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}>;
export declare const addUserSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    address: z.ZodOptional<z.ZodString>;
    password: z.ZodString;
    role: z.ZodEnum<["SYSTEM_ADMIN", "NORMAL_USER", "STORE_OWNER"]>;
}, "strip", z.ZodTypeAny, {
    name: string;
    role: "SYSTEM_ADMIN" | "NORMAL_USER" | "STORE_OWNER";
    email: string;
    password: string;
    address?: string | undefined;
}, {
    name: string;
    role: "SYSTEM_ADMIN" | "NORMAL_USER" | "STORE_OWNER";
    email: string;
    password: string;
    address?: string | undefined;
}>;
export declare const addStoreSchema: z.ZodObject<{
    storeName: z.ZodString;
    email: z.ZodString;
    address: z.ZodString;
    storeOwnerId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    address: string;
    email: string;
    storeName: string;
    storeOwnerId: string;
}, {
    address: string;
    email: string;
    storeName: string;
    storeOwnerId: string;
}>;
export declare const ratingSchema: z.ZodObject<{
    storeId: z.ZodString;
    score: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    storeId: string;
    score: number;
}, {
    storeId: string;
    score: number;
}>;
