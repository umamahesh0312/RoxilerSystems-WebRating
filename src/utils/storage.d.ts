export declare const storage: {
    setToken: (token: string) => void;
    getToken: () => string | null;
    removeToken: () => void;
    setUser: (user: any) => void;
    getUser: () => any;
    removeUser: () => void;
    clear: () => void;
};
