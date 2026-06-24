import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Button,
  Stack,
  Card,
  CardContent,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { AdminLayout } from '@/layouts/AdminLayout';
import { SearchBar } from '@/components/SearchBar';
import { DataTable, Column, Action } from '@/components/DataTable';
import { PaginationComponent } from '@/components/PaginationComponent';
import { RatingStars } from '@/components/RatingStars';
import storeService from '@/services/storeService';
import { Store, StoreFilterOptions } from '@/types';

export const AdminStoresPage: React.FC = () => {
  const navigate = useNavigate();
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');

  useEffect(() => {
    loadStores();
  }, [currentPage, search]);

  const loadStores = async () => {
    try {
      setLoading(true);
      const filters: StoreFilterOptions = {
        search,
        page: currentPage,
        pageSize: 10,
      };
      const response = await storeService.getStores(filters);
      setStores(response.data);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error('Failed to load stores:', error);
    } finally {
      setLoading(false);
    }
  };

  const columns: Column<Store>[] = [
    { id: 'storeName', label: 'Store Name' },
    { id: 'email', label: 'Email' },
    { id: 'address', label: 'Address' },
    {
      id: 'averageRating',
      label: 'Average Rating',
      render: (value) => <RatingStars value={value} readOnly showValue />,
    },
  ];

  const actions: Action<Store>[] = [
    {
      label: 'View',
      onClick: (store) => navigate(`/admin/stores/${store.id}`),
      color: 'primary',
    },
  ];

  return (
    <AdminLayout>
      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Stores
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate('/admin/add-store')}
          >
            Add Store
          </Button>
        </Stack>

        <Card sx={{ mb: 2 }}>
          <CardContent>
            <SearchBar
              placeholder="Search by store name or address..."
              onSearch={setSearch}
              fullWidth
            />
          </CardContent>
        </Card>

        <DataTable
          columns={columns}
          data={stores}
          actions={actions}
          loading={loading}
          emptyMessage="No stores found"
        />

        {totalPages > 1 && (
          <PaginationComponent
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </Container>
    </AdminLayout>
  );
};

export default AdminStoresPage;
