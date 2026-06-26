export declare enum UserRole {
    SYSTEM_ADMIN = "SYSTEM_ADMIN",
    NORMAL_USER = "NORMAL_USER",
    STORE_OWNER = "STORE_OWNER"
}
export interface User {
    id: string;
    name: string;
    email: string;
    address: string;
    role: UserRole;
    createdAt: string;
    updatedAt: string;
}
export interface Store {
    id: string;
    storeName: string;
    email: string;
    address: string;
    ownerId: string;
    averageRating: number;
    totalRatings: number;
    userRating?: number | null;
    createdAt: string;
    updatedAt: string;
}
export interface Rating {
    id: string;
    storeId: string;
    userId: string;
    score: number;
    createdAt: string;
    updatedAt: string;
    userName?: string;
    userEmail?: string;
    storeName?: string;
}
export interface AuthResponse {
    token: string;
    user: User;
}
export interface AuthContextType {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<User>;
    signup: (data: SignupFormData) => Promise<void>;
    logout: () => void;
}
export interface LoginFormData {
    email: string;
    password: string;
    rememberMe?: boolean;
}
export interface SignupFormData {
    name: string;
    email: string;
    address: string;
    password: string;
}
export interface ChangePasswordFormData {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}
export interface AddUserFormData {
    name: string;
    email: string;
    address: string;
    password: string;
    role: UserRole;
}
export interface AddStoreFormData {
    storeName: string;
    email: string;
    address: string;
    storeOwnerId: string;
}
export interface RatingSubmitData {
    storeId: string;
    score: number;
}
export interface DashboardStats {
    totalUsers: number;
    totalStores: number;
    totalRatings: number;
    averageRating: number;
}
export interface RatingsOverviewData {
    rating: number;
    count: number;
}
export interface UserDistributionData {
    role: UserRole;
    count: number;
}
export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    message?: string;
    error?: string;
}
export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
}
export interface FilterOptions {
    search?: string;
    role?: UserRole;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    page?: number;
    pageSize?: number;
}
export interface StoreFilterOptions {
    search?: string;
    minRating?: number;
    maxRating?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    ownerId?: string;
    page?: number;
    pageSize?: number;
}
