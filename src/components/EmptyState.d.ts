import React from 'react';
interface EmptyStateProps {
    title: string;
    message: string;
    actionLabel?: string;
    actionUrl?: string;
    icon?: React.ReactNode;
}
export declare const EmptyState: React.FC<EmptyStateProps>;
export default EmptyState;
