import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Container,
  Paper,
  TextField,
  Button,
  Box,
  Typography,
  Alert,
  CircularProgress,
  Tabs,
  Tab,
  Card,
  CardContent,
  InputAdornment,
  IconButton,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { changePasswordSchema } from '@/utils/validation';
import { useAuth } from '@/hooks/useAuth';
import { ChangePasswordFormData } from '@/types';
import { UserLayout } from '@/layouts/UserLayout';
import authService from '@/services/authService';
import { MOCK_STORES } from '@/constants/mockData';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => (
  <div role="tabpanel" hidden={value !== index}>
    {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
  </div>
);

export const StoreOwnerProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [tabValue, setTabValue] = useState(0);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const userStores = MOCK_STORES.filter(s => s.ownerId === user?.id);
  const avgStoreRating = userStores.length > 0
    ? (userStores.reduce((sum, s) => sum + s.averageRating, 0) / userStores.length).toFixed(2)
    : '0.00';

  const { control, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: ChangePasswordFormData) => {
    try {
      setError('');
      await authService.changePassword(data);
      setSuccess(true);
      reset();
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError((err as Error).message || 'Failed to change password');
    }
  };

  return (
    <UserLayout>
      <Container maxWidth="md" sx={{ py: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
          Store Profile
        </Typography>

        <Paper>
          <Tabs value={tabValue} onChange={(_, val) => setTabValue(val)}>
            <Tab label="Store Details" />
            <Tab label="Change Password" />
          </Tabs>

          <TabPanel value={tabValue} index={0}>
            <Box sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Your Information
              </Typography>
              <Card sx={{ mb: 2 }}>
                <CardContent>
                  <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
                    <Box>
                      <Typography color="textSecondary" variant="body2">
                        Name
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        {user?.name}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography color="textSecondary" variant="body2">
                        Email
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        {user?.email}
                      </Typography>
                    </Box>
                    <Box sx={{ gridColumn: '1 / -1' }}>
                      <Typography color="textSecondary" variant="body2">
                        Address
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        {user?.address || 'N/A'}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>

              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, mt: 3 }}>
                Store Statistics
              </Typography>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
                    <Box>
                      <Typography color="textSecondary" variant="body2">
                        Total Stores
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        {userStores.length}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography color="textSecondary" variant="body2">
                        Average Rating
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 600, color: '#f59e0b' }}>
                        {avgStoreRating} / 5
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <Box sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Change Password
              </Typography>

              {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
              {success && <Alert severity="success" sx={{ mb: 2 }}>Password changed successfully!</Alert>}

              <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
                <Controller
                  name="currentPassword"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Current Password"
                      type="password"
                      margin="normal"
                      variant="outlined"
                      error={!!errors.currentPassword}
                      helperText={errors.currentPassword?.message}
                      disabled={isSubmitting}
                    />
                  )}
                />

                <Controller
                  name="newPassword"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="New Password"
                      type={showPassword ? 'text' : 'password'}
                      margin="normal"
                      variant="outlined"
                      error={!!errors.newPassword}
                      helperText={errors.newPassword?.message}
                      disabled={isSubmitting}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowPassword(!showPassword)}
                              edge="end"
                              disabled={isSubmitting}
                            >
                              {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />

                <Controller
                  name="confirmPassword"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Confirm Password"
                      type="password"
                      margin="normal"
                      variant="outlined"
                      error={!!errors.confirmPassword}
                      helperText={errors.confirmPassword?.message}
                      disabled={isSubmitting}
                    />
                  )}
                />

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ mt: 3 }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? <CircularProgress size={24} /> : 'Change Password'}
                </Button>
              </Box>
            </Box>
          </TabPanel>
        </Paper>
      </Container>
    </UserLayout>
  );
};

export default StoreOwnerProfilePage;
