import { AuthResponse, LoginFormData, SignupFormData, ChangePasswordFormData, User } from '@/types';
import { UserRole } from '@/types';
interface BackendApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}
interface BackendPaginatedResponse<T> {
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
declare function mapRole(role: string): UserRole;
declare function mapUser(backendUser: {
    id: string;
    name: string;
    email: string;
    role: string;
    address: string | null;
    createdAt: string;
    updatedAt: string;
}): User;
declare function mapStore(backendStore: any): {
    id: any;
    storeName: any;
    name: any;
    email: any;
    address: any;
    ownerId: any;
    averageRating: any;
    totalRatings: any;
    userRating: any;
    createdAt: any;
    updatedAt: any;
};
declare class AuthService {
    login(credentials: LoginFormData): Promise<AuthResponse>;
    signup(data: SignupFormData): Promise<AuthResponse>;
    changePassword(data: ChangePasswordFormData): Promise<void>;
    logout(): Promise<void>;
}
export { mapUser, mapRole, mapStore };
export type { BackendApiResponse, BackendPaginatedResponse };
declare const _default: AuthService;
export default _default;
