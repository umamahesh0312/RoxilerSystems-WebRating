import { User, FilterOptions, PaginatedResponse, AddUserFormData, Store } from '@/types';
declare class AdminService {
    getUsers(filters?: FilterOptions): Promise<PaginatedResponse<User>>;
    getUserById(id: string): Promise<User>;
    addUser(data: AddUserFormData): Promise<User>;
    updateUser(id: string, data: Partial<User>): Promise<User>;
    deleteUser(id: string): Promise<void>;
    getDashboard(): Promise<any>;
    getStores(filters?: any): Promise<PaginatedResponse<Store>>;
    getStoreById(id: string): Promise<Store>;
    addStore(data: any): Promise<Store>;
    updateStore(id: string, data: Partial<Store>): Promise<Store>;
    deleteStore(id: string): Promise<void>;
}
declare const _default: AdminService;
export default _default;
