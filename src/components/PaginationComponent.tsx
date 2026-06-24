import React from 'react';
import { Box, Pagination as MuiPagination, PaginationProps as MuiPaginationProps } from '@mui/material';

interface PaginationComponentProps extends Omit<MuiPaginationProps, 'count' | 'page' | 'onChange'> {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const PaginationComponent: React.FC<PaginationComponentProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  ...props
}) => {
  return (
    <Box display="flex" justifyContent="center" my={3}>
      <MuiPagination
        count={totalPages}
        page={currentPage}
        onChange={(_, page) => onPageChange(page)}
        color="primary"
        {...props}
      />
    </Box>
  );
};

export default PaginationComponent;
