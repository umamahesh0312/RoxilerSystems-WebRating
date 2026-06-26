import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { addStoreSchema } from '@/utils/validation';
import adminService from '@/services/adminService';
import storeService from '@/services/storeService';
import { AddStoreFormData, User, UserRole } from '@/types';
import { AdminLayout } from '@/layouts/AdminLayout';

export const AdminAddStorePage: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState(false);
  const [storeOwners, setStoreOwners] = useState<User[]>([]);

  useEffect(() => {
    const loadStoreOwners = async () => {
      try {
        const response = await adminService.getUsers({ page: 1, pageSize: 100, role: UserRole.STORE_OWNER });
        setStoreOwners(response.data);
      } catch (err) {
        console.error('Failed to load store owners:', err);
      }
    };

    loadStoreOwners();
  }, []);

  const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm<AddStoreFormData>({
    resolver: zodResolver(addStoreSchema),
    defaultValues: {
      storeName: '',
      email: '',
      address: '',
      storeOwnerId: '',
    },
  });

  const onSubmit = async (data: AddStoreFormData) => {
    try {
      setError('');
      await storeService.addStore(data);
      setSuccess(true);
      setTimeout(() => navigate('/admin/stores'), 2000);
    } catch (err) {
      setError((err as Error).message || 'Failed to add store');
    }
  };

  return (
    <AdminLayout>
      <Container maxWidth="md" sx={{ py: 3 }}>
        <Paper elevation={3} sx={{ p: { xs: 3, sm: 4 }, borderRadius: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
            Add New Store
          </Typography>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mb: 2 }}>Store added successfully!</Alert>}

          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <Controller
              name="storeName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Store Name"
                  margin="normal"
                  variant="outlined"
                  error={!!errors.storeName}
                  helperText={errors.storeName?.message}
                  disabled={isSubmitting}
                />
              )}
            />

            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Email"
                  type="email"
                  margin="normal"
                  variant="outlined"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  disabled={isSubmitting}
                />
              )}
            />

            <Controller
              name="address"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Address"
                  margin="normal"
                  variant="outlined"
                  multiline
                  rows={2}
                  error={!!errors.address}
                  helperText={errors.address?.message}
                  disabled={isSubmitting}
                />
              )}
            />

            <Controller
              name="storeOwnerId"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth margin="normal" error={!!errors.storeOwnerId}>
                  <InputLabel>Store Owner</InputLabel>
                  <Select
                    {...field}
                    label="Store Owner"
                    disabled={isSubmitting}
                  >
                    {storeOwners.map(owner => (
                      <MenuItem key={owner.id} value={owner.id}>
                        {owner.name} ({owner.email})
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />

            <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? <CircularProgress size={24} /> : 'Add Store'}
              </Button>
              <Button
                variant="outlined"
                onClick={() => navigate('/admin/stores')}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </AdminLayout>
  );
};

export default AdminAddStorePage;
