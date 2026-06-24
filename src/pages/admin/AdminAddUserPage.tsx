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
import { addUserSchema } from '@/utils/validation';
import adminService from '@/services/adminService';
import { AddUserFormData, UserRole } from '@/types';
import { AdminLayout } from '@/layouts/AdminLayout';

export const AdminAddUserPage: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState(false);

  const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm<AddUserFormData>({
    resolver: zodResolver(addUserSchema),
    defaultValues: {
      name: '',
      email: '',
      address: '',
      password: '',
      role: UserRole.NORMAL_USER,
    },
  });

  const onSubmit = async (data: AddUserFormData) => {
    try {
      setError('');
      await adminService.addUser(data);
      setSuccess(true);
      setTimeout(() => navigate('/admin/users'), 2000);
    } catch (err) {
      setError((err as Error).message || 'Failed to add user');
    }
  };

  return (
    <AdminLayout>
      <Container maxWidth="md" sx={{ py: 3 }}>
        <Paper elevation={3} sx={{ p: { xs: 3, sm: 4 }, borderRadius: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
            Add New User
          </Typography>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mb: 2 }}>User added successfully!</Alert>}

          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Name"
                  margin="normal"
                  variant="outlined"
                  error={!!errors.name}
                  helperText={errors.name?.message}
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
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Password"
                  type="password"
                  margin="normal"
                  variant="outlined"
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  disabled={isSubmitting}
                />
              )}
            />

            <Controller
              name="role"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth margin="normal" error={!!errors.role}>
                  <InputLabel>Role</InputLabel>
                  <Select
                    {...field}
                    label="Role"
                    disabled={isSubmitting}
                  >
                    <MenuItem value={UserRole.NORMAL_USER}>Normal User</MenuItem>
                    <MenuItem value={UserRole.STORE_OWNER}>Store Owner</MenuItem>
                    <MenuItem value={UserRole.SYSTEM_ADMIN}>System Admin</MenuItem>
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
                {isSubmitting ? <CircularProgress size={24} /> : 'Add User'}
              </Button>
              <Button
                variant="outlined"
                onClick={() => navigate('/admin/users')}
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

export default AdminAddUserPage;
