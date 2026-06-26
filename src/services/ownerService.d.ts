import { Store, PaginatedResponse, Rating } from '@/types';
declare class OwnerService {
    getDashboard(): Promise<{
        averageRating: number;
        totalRatings: number;
        storeCount: number;
    }>;
    getStores(): Promise<Store[]>;
    getRatings(storeId: string, page?: number, pageSize?: number): Promise<PaginatedResponse<Rating>>;
}
declare const _default: OwnerService;
export default _default;
