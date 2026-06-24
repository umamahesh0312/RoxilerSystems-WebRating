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
import { MOCK_STORES, MOCK_RATINGS } from '@/constants/mockData';
import { DataTable, Column } from '@/components/DataTable';
import { Rating } from '@/types';
import { RatingStars } from '@/components/RatingStars';

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
  const { user } = useAuth();
  const [stores, setStores] = useState(MOCK_STORES.filter(s => s.ownerId === user?.id));
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [averageRating, setAverageRating] = useState(0);
  const [totalRatings, setTotalRatings] = useState(0);

  useEffect(() => {
    if (user) {
      // Get ratings for this owner's stores
      const storeIds = stores.map(s => s.id);
      const storeRatings = MOCK_RATINGS.filter(r => storeIds.includes(r.storeId));
      setRatings(storeRatings);
      setTotalRatings(storeRatings.length);

      if (storeRatings.length > 0) {
        const avg = storeRatings.reduce((sum, r) => sum + r.score, 0) / storeRatings.length;
        setAverageRating(parseFloat(avg.toFixed(2)));
      }
    }
  }, [user, stores]);

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
