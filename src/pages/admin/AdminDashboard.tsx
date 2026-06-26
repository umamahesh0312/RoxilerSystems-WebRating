import React, { useState, useEffect } from 'react';
import {
  Grid,
  Paper,
  Card,
  CardContent,
  Typography,
  Box,
  Container,
} from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import StorefrontIcon from '@mui/icons-material/Storefront';
import RateReviewIcon from '@mui/icons-material/RateReview';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { AdminLayout } from '@/layouts/AdminLayout';
import adminService from '@/services/adminService';

const COLORS = ['#2563eb', '#7c3aed', '#10b981', '#f59e0b', '#ef4444'];

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

type RatingsOverviewData = { name: string; count: number };
type UserDistributionData = { name: string; value: number };

export const AdminDashboard: React.FC = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalStores, setTotalStores] = useState(0);
  const [totalRatings, setTotalRatings] = useState(0);
  const [averageRating, setAverageRating] = useState(0);

useEffect(() => {
  const loadDashboard = async () => {
    try {
      const dashboard = await adminService.getDashboard();
      setTotalUsers(dashboard.totalUsers);
      setTotalStores(dashboard.totalStores);
      setTotalRatings(dashboard.totalRatings);
      if (dashboard.averageRating !== undefined) {
        setAverageRating(dashboard.averageRating);
      }
    } catch (error) {
      console.error('Failed to load admin dashboard:', error);
    }
  };

  loadDashboard();
}, []);

  return (
    <AdminLayout>
      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
          Dashboard
        </Typography>

        {/* Stats Grid */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Total Users"
              value={totalUsers}
              icon={<PeopleIcon sx={{ fontSize: 40 }} />}
              color="#2563eb"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Total Stores"
              value={totalStores}
              icon={<StorefrontIcon sx={{ fontSize: 40 }} />}
              color="#7c3aed"
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
              title="Average Rating"
              value={averageRating}
              icon={<TrendingUpIcon sx={{ fontSize: 40 }} />}
              color="#f59e0b"
            />
          </Grid>
        </Grid>

      </Container>
    </AdminLayout>
  );
};

export default AdminDashboard;
