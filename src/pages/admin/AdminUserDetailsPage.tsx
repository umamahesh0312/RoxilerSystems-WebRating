import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Box, Paper, Typography, Grid, Card, CardContent, Skeleton } from '@mui/material';
import { AdminLayout } from '@/layouts/AdminLayout';
import { User } from '@/types';
import adminService from '@/services/adminService';
import storeService from '@/services/storeService';
import { MOCK_STORES } from '@/constants/mockData';

export const AdminUserDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [storeRating, setStoreRating] = useState<number | null>(null);

  useEffect(() => {
    loadUserDetails();
  }, [id]);

  const loadUserDetails = async () => {
    try {
      setLoading(true);
      if (id) {
        const userData = await adminService.getUserById(id);
        setUser(userData);

        // If store owner, get average rating
        if (userData.role === 'STORE_OWNER') {
          const stores = MOCK_STORES.filter(s => s.ownerId === id);
          if (stores.length > 0) {
            const avgRating = stores.reduce((sum, s) => sum + s.averageRating, 0) / stores.length;
            setStoreRating(avgRating);
          }
        }
      }
    } catch (error) {
      console.error('Failed to load user:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <Container maxWidth="md" sx={{ py: 3 }}>
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

  if (!user) {
    return (
      <AdminLayout>
        <Container maxWidth="md" sx={{ py: 3 }}>
          <Typography color="error">User not found</Typography>
        </Container>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <Container maxWidth="md" sx={{ py: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
          User Details
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Box>
                    <Typography color="textSecondary" variant="body2">
                      Name
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {user.name}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box>
                    <Typography color="textSecondary" variant="body2">
                      Email
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {user.email}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box>
                    <Typography color="textSecondary" variant="body2">
                      Address
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {user.address || 'N/A'}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box>
                    <Typography color="textSecondary" variant="body2">
                      Role
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {user.role}
                    </Typography>
                  </Box>
                </Grid>
                {user.role === 'STORE_OWNER' && storeRating !== null && (
                  <Grid item xs={12}>
                    <Box>
                      <Typography color="textSecondary" variant="body2">
                        Average Store Rating
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: 600, color: '#f59e0b' }}>
                        {storeRating.toFixed(2)} / 5
                      </Typography>
                    </Box>
                  </Grid>
                )}
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </AdminLayout>
  );
};

export default AdminUserDetailsPage;
