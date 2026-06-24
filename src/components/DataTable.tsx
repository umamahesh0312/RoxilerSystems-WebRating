import React from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Stack,
  Typography,
} from '@mui/material';

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

export const DataTable = React.forwardRef<HTMLDivElement, DataTableProps<any>>(
  ({ columns, data, actions, loading = false, emptyMessage = 'No data available' }, ref) => {
    if (!loading && data.length === 0) {
      return (
        <Box ref={ref} p={3} textAlign="center">
          <Typography color="textSecondary">{emptyMessage}</Typography>
        </Box>
      );
    }

    return (
      <TableContainer component={Paper} ref={ref}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f3f4f6' }}>
              {columns.map((column) => (
                <TableCell key={String(column.id)} align={column.align || 'left'} sx={{ fontWeight: 600 }}>
                  {column.label}
                </TableCell>
              ))}
              {actions && actions.length > 0 && (
                <TableCell align="center" sx={{ fontWeight: 600 }}>
                  Actions
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index} hover>
                {columns.map((column) => (
                  <TableCell key={String(column.id)} align={column.align || 'left'}>
                    {column.render ? column.render(row[column.id], row) : row[column.id]}
                  </TableCell>
                ))}
                {actions && actions.length > 0 && (
                  <TableCell align="center">
                    <Stack direction="row" spacing={1} justifyContent="center">
                      {actions.map((action, idx) => (
                        <Button
                          key={idx}
                          size="small"
                          variant={action.variant || 'text'}
                          color={action.color || 'primary'}
                          onClick={() => action.onClick(row)}
                        >
                          {action.label}
                        </Button>
                      ))}
                    </Stack>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
);

DataTable.displayName = 'DataTable';

export default DataTable;
