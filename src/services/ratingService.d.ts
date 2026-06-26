import { Rating, PaginatedResponse } from '@/types';
interface RatingSubmitData {
    storeId: string;
    score: number;
}
declare class RatingService {
    getRatingsByStore(storeId: string, page?: number, pageSize?: number): Promise<PaginatedResponse<Rating>>;
    getRatingsByUser(userId: string, page?: number, pageSize?: number): Promise<PaginatedResponse<Rating>>;
    submitRating(data: RatingSubmitData): Promise<Rating>;
    updateRating(storeId: string, score: number): Promise<Rating>;
    deleteRating(storeId: string): Promise<void>;
    getUserRatingForStore(userId: string, storeId: string): Promise<Rating | null>;
}
declare const _default: RatingService;
export default _default;
