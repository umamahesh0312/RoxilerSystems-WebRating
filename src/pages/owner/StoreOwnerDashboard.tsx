import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Paper,
} from '@mui/material';
import RateReviewIcon from '@mui/icons-material/RateReview';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { UserLayout } from '@/layouts/UserLayout';
import { useAuth } from '@/hooks/useAuth';
import { DataTable, Column } from '@/components/DataTable';
import { Rating, Store } from '@/types';
import { RatingStars } from '@/components/RatingStars';
import ownerService from '@/services/ownerService';

const StatCard: React.FC<{ title: string; value: string | number; icon: React.ReactNode; color: string }> = ({
  title,
  value,
  icon,
  color,
}) => (
  <Card sx={{ height: '100%' }}>
    <CardContent>
      <Box display="flex" justifyContent="space-between" alignItems="flex-start">
        <Box>
          <Typography color="textSecondary" gutterBottom>
            {title}
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            {value}
          </Typography>
        </Box>
        <Box sx={{ color, fontSize: 40 }}>
          {icon}
        </Box>
      </Box>
    </CardContent>
  </Card>
);

export const StoreOwnerDashboard: React.FC = () => {
  const [stores, setStores] = useState<Store[]>([]);
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [averageRating, setAverageRating] = useState(0);
  const [totalRatings, setTotalRatings] = useState(0);
  const [storeCount, setStoreCount] = useState(0);

  useEffect(() => {
    const loadOwnerData = async () => {
      try {
        const dashboard = await ownerService.getDashboard();
        setAverageRating(dashboard.averageRating);
        setTotalRatings(dashboard.totalRatings);
        setStoreCount(dashboard.storeCount);

        const storesData = await ownerService.getStores();
        setStores(storesData);

        const ratingsByStore = await Promise.all(
          storesData.map(async (store) => {
            const response = await ownerService.getRatings(store.id);
            return response.data.map((rating) => ({
              ...rating,
              storeName: store.storeName,
            }));
          })
        );

        setRatings(ratingsByStore.flat());
      } catch (error) {
        console.error('Failed to load owner dashboard data:', error);
      }
    };

    loadOwnerData();
  }, []);

  const columns: Column<Rating>[] = [
    { id: 'storeName', label: 'Store' },
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
    <UserLayout>
      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Store Owner Dashboard
        </Typography>
        <Typography color="textSecondary" sx={{ mb: 3 }}>
          Overview of your store ratings and activity
        </Typography>

        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Average Rating"
              value={averageRating.toFixed(1)}
              icon={<RateReviewIcon sx={{ fontSize: 40 }} />}
              color="#f59e0b"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Total Ratings"
              value={totalRatings}
              icon={<RateReviewIcon sx={{ fontSize: 40 }} />}
              color="#10b981"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="My Stores"
              value={stores.length}
              icon={<StorefrontIcon sx={{ fontSize: 40 }} />}
              color="#2563eb"
            />
          </Grid>
        </Grid>

        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            Recent Ratings
          </Typography>
          <DataTable
            columns={columns}
            data={ratings}
            emptyMessage="No ratings yet"
          />
        </Paper>
      </Container>
    </UserLayout>
  );
};

export default StoreOwnerDashboard;
