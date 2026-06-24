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
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { AdminLayout } from '@/layouts/AdminLayout';
import { MOCK_USERS, MOCK_STORES, MOCK_RATINGS } from '@/constants/mockData';
import { UserRole } from '@/types';

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

export const AdminDashboard: React.FC = () => {
  const [ratingsOverviewData, setRatingsOverviewData] = useState([]);
  const [userDistributionData, setUserDistributionData] = useState([]);

  useEffect(() => {
    // Calculate ratings overview
    const ratingCounts = [0, 0, 0, 0, 0];
    MOCK_RATINGS.forEach(rating => {
      ratingCounts[rating.score - 1]++;
    });

    setRatingsOverviewData(
      ratingCounts.map((count, index) => ({
        name: `${index + 1} Star`,
        count,
      }))
    );

    // Calculate user distribution
    const userDistribution: { [key: string]: number } = {};
    MOCK_USERS.forEach(user => {
      userDistribution[user.role] = (userDistribution[user.role] || 0) + 1;
    });

    setUserDistributionData(
      Object.entries(userDistribution).map(([role, count]) => ({
        name: role,
        value: count,
      }))
    );
  }, []);

  const totalUsers = MOCK_USERS.length;
  const totalStores = MOCK_STORES.length;
  const totalRatings = MOCK_RATINGS.length;
  const averageRating = (MOCK_RATINGS.reduce((sum, r) => sum + r.score, 0) / MOCK_RATINGS.length).toFixed(1);

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

        {/* Charts */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Ratings Overview
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={ratingsOverviewData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#2563eb" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                User Distribution
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={userDistributionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {userDistributionData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </AdminLayout>
  );
};

export default AdminDashboard;
