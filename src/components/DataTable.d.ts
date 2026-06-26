import React from 'react';
export interface Column<T> {
    id: keyof T;
    label: string;
    align?: 'left' | 'center' | 'right';
    width?: string;
    render?: (value: any, row: T) => React.ReactNode;
}
export interface Action<T> {
    label: string;
    onClick: (row: T) => void;
    color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
    variant?: 'text' | 'outlined' | 'contained';
}
interface DataTableProps<T> {
    columns: Column<T>[];
    data: T[];
    actions?: Action<T>[];
    loading?: boolean;
    emptyMessage?: string;
}
export declare const DataTable: React.ForwardRefExoticComponent<DataTableProps<any> & React.RefAttributes<HTMLDivElement>>;
export default DataTable;
