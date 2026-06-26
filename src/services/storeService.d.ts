import { Store, StoreFilterOptions, PaginatedResponse } from '@/types';
declare class StoreService {
    getStores(filters?: StoreFilterOptions): Promise<PaginatedResponse<Store>>;
    getStoreById(id: string): Promise<Store>;
    addStore(data: any): Promise<Store>;
    updateStore(id: string, data: Partial<Store>): Promise<Store>;
    deleteStore(id: string): Promise<void>;
    getStoresByOwner(ownerId: string): Promise<Store[]>;
    getStoresForUser(filters?: StoreFilterOptions): Promise<PaginatedResponse<Store>>;
}
declare const _default: StoreService;
export default _default;
