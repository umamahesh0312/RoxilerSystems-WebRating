import { User, ChangePasswordFormData, PaginatedResponse } from '@/types';
declare class UserService {
    getUserProfile(): Promise<User>;
    getDashboard(): Promise<{
        totalStores: number;
        totalRatings: number;
    }>;
    getUserRatings(page?: number, pageSize?: number): Promise<PaginatedResponse<any>>;
    changePassword(data: ChangePasswordFormData): Promise<void>;
}
declare const _default: UserService;
export default _default;
