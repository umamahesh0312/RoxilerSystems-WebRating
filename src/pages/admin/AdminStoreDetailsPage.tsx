import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  Skeleton,
} from '@mui/material';
import { AdminLayout } from '@/layouts/AdminLayout';
import { Store, Rating } from '@/types';
import { DataTable, Column } from '@/components/DataTable';
import { RatingStars } from '@/components/RatingStars';
import storeService from '@/services/storeService';
import ratingService from '@/services/ratingService';
import { MOCK_RATINGS } from '@/constants/mockData';

export const AdminStoreDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [store, setStore] = useState<Store | null>(null);
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStoreDetails();
  }, [id]);

  const loadStoreDetails = async () => {
    try {
      setLoading(true);
      if (id) {
        const storeData = await storeService.getStoreById(id);
        setStore(storeData);

        // Get ratings for this store
        const storeRatings = MOCK_RATINGS.filter(r => r.storeId === id);
        setRatings(storeRatings);
      }
    } catch (error) {
      console.error('Failed to load store:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <Container maxWidth="lg" sx={{ py: 3 }}>
          <Skeleton variant="text" width="40%" height={40} sx={{ mb: 2 }} />
          <Card>
            <CardContent>
              <Skeleton variant="text" width="30%" sx={{ mb: 2 }} />
              <Skeleton variant="text" />
              <Skeleton variant="text" />
            </CardContent>
          </Card>
        </Container>
      </AdminLayout>
    );
  }

  if (!store) {
    return (
      <AdminLayout>
        <Container maxWidth="lg" sx={{ py: 3 }}>
          <Typography color="error">Store not found</Typography>
        </Container>
      </AdminLayout>
    );
  }

  const columns: Column<Rating>[] = [
    { id: 'userName', label: 'User Name' },
    { id: 'userEmail', label: 'User Email' },
    {
      id: 'score',
      label: 'Rating',
      render: (value) => <RatingStars value={value} readOnly showValue size="small" />,
    },
    {
      id: 'createdAt',
      label: 'Date',
      render: (value) => new Date(value).toLocaleDateString(),
    },
  ];

  return (
    <AdminLayout>
      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
          Store Details
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Box>
                    <Typography color="textSecondary" variant="body2">
                      Store Name
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {store.storeName}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box>
                    <Typography color="textSecondary" variant="body2">
                      Email
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {store.email}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box>
                    <Typography color="textSecondary" variant="body2">
                      Address
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {store.address}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box>
                    <Typography color="textSecondary" variant="body2">
                      Average Rating
                    </Typography>
                    <RatingStars value={store.averageRating} readOnly showValue />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box>
                    <Typography color="textSecondary" variant="body2">
                      Total Ratings
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {store.totalRatings}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Recent Ratings
              </Typography>
              <DataTable
                columns={columns}
                data={ratings}
                emptyMessage="No ratings yet"
              />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </AdminLayout>
  );
};

export default AdminStoreDetailsPage;
