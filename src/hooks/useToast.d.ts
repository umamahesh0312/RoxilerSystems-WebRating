interface ToastMessage {
    id: string;
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
    duration?: number;
}
export declare const useToast: () => {
    toasts: ToastMessage[];
    showToast: (message: string, type?: "success" | "error" | "warning" | "info", duration?: number) => string;
    removeToast: (id: string) => void;
};
export {};
