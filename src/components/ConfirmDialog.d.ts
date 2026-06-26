import React from 'react';
interface ConfirmDialogProps {
    open: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
    confirmText?: string;
    cancelText?: string;
    loading?: boolean;
    variant?: 'error' | 'warning' | 'info' | 'success';
}
export declare const ConfirmDialog: React.FC<ConfirmDialogProps>;
export default ConfirmDialog;
