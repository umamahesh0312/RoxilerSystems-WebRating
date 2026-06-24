import React, { useState } from 'react';
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
  Link,
  Alert,
  CircularProgress,
  InputAdornment,
  IconButton,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { signupSchema } from '@/utils/validation';
import { useAuth } from '@/hooks/useAuth';
import { SignupFormData } from '@/types';
import { AuthLayout } from '@/layouts/AuthLayout';

export const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const { signup, isLoading } = useAuth();
  const [error, setError] = useState<string>('');
  const [showPassword, setShowPassword] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      address: '',
      password: '',
    },
  });

  const onSubmit = async (data: SignupFormData) => {
    try {
      setError('');
      await signup(data);
      navigate('/user/dashboard', { replace: true });
    } catch (err) {
      setError((err as Error).message || 'Signup failed');
    }
  };

  return (
    <AuthLayout>
      <Container maxWidth="sm" sx={{ py: { xs: 4, sm: 8 } }}>
        <Paper elevation={3} sx={{ p: { xs: 3, sm: 4 }, borderRadius: 2 }}>
          <Typography variant="h4" component="h1" gutterBottom sx={{ textAlign: 'center', fontWeight: 700, mb: 1 }}>
            Create Account
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ textAlign: 'center', mb: 3 }}
          >
            Join StoreRating platform
          </Typography>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Full Name"
                  margin="normal"
                  variant="outlined"
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  disabled={isLoading}
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
                  disabled={isLoading}
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
                  disabled={isLoading}
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
                  type={showPassword ? 'text' : 'password'}
                  margin="normal"
                  variant="outlined"
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  disabled={isLoading}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                          disabled={isLoading}
                        >
                          {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, py: 1.2 }}
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={24} /> : 'Create Account'}
            </Button>
          </Box>

          <Typography variant="body2" sx={{ textAlign: 'center', mt: 2 }}>
            Already have an account?{' '}
            <Link
              href="/login"
              sx={{
                color: '#2563eb',
                cursor: 'pointer',
                textDecoration: 'none',
                fontWeight: 600,
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              Sign in
            </Link>
          </Typography>
        </Paper>
      </Container>
    </AuthLayout>
  );
};

export default SignupPage;
