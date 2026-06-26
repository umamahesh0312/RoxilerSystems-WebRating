import React from 'react';
import { PaginationProps as MuiPaginationProps } from '@mui/material';
interface PaginationComponentProps extends Omit<MuiPaginationProps, 'count' | 'page' | 'onChange'> {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}
export declare const PaginationComponent: React.FC<PaginationComponentProps>;
export default PaginationComponent;
