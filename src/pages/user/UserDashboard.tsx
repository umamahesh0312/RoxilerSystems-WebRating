import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
} from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import StorefrontIcon from '@mui/icons-material/Storefront';
import RateReviewIcon from '@mui/icons-material/RateReview';
import { UserLayout } from '@/layouts/UserLayout';
import { useAuth } from '@/hooks/useAuth';
import userService from '@/services/userService';

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

export const UserDashboard: React.FC = () => {
  const { user } = useAuth();
  const [totalStores, setTotalStores] = useState(0);
  const [submittedRatings, setSubmittedRatings] = useState(0);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const dashboard = await userService.getDashboard();
        setTotalStores(dashboard.totalStores);
        setSubmittedRatings(dashboard.totalRatings);
      } catch (error) {
        console.error('Failed to load dashboard data:', error);
      }
    };

    loadDashboard();
  }, []);

  return (
    <UserLayout>
      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Welcome, {user?.name}!
        </Typography>
        <Typography color="textSecondary" sx={{ mb: 3 }}>
          Here's an overview of your activity
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <StatCard
              title="Total Stores"
              value={totalStores}
              icon={<StorefrontIcon sx={{ fontSize: 40 }} />}
              color="#2563eb"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <StatCard
              title="Ratings Submitted"
              value={submittedRatings}
              icon={<RateReviewIcon sx={{ fontSize: 40 }} />}
              color="#10b981"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <StatCard
              title="Your Address"
              value={user?.address?.substring(0, 20) + '...'}
              icon={<PeopleIcon sx={{ fontSize: 40 }} />}
              color="#7c3aed"
            />
          </Grid>
        </Grid>
      </Container>
    </UserLayout>
  );
};

export default UserDashboard;
