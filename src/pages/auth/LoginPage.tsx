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
import { loginSchema } from '@/utils/validation';
import { useAuth } from '@/hooks/useAuth';
import { LoginFormData } from '@/types';
import { AuthLayout } from '@/layouts/AuthLayout';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();
  const [error, setError] = useState<string>('');
  const [showPassword, setShowPassword] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'admin@example.com',
      password: 'Admin@123',
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setError('');
      await login(data.email, data.password);
      navigate('/admin/dashboard', { replace: true });
    } catch (err) {
      setError((err as Error).message || 'Login failed');
    }
  };

  return (
    <AuthLayout>
      <Container maxWidth="sm" sx={{ py: { xs: 4, sm: 8 } }}>
        <Paper elevation={3} sx={{ p: { xs: 3, sm: 4 }, borderRadius: 2 }}>
          <Typography variant="h4" component="h1" gutterBottom sx={{ textAlign: 'center', fontWeight: 700, mb: 1 }}>
            StoreRating Platform
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ textAlign: 'center', mb: 3 }}
          >
            Sign in to your account
          </Typography>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
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
              {isLoading ? <CircularProgress size={24} /> : 'Sign In'}
            </Button>
          </Box>

          <Typography variant="body2" sx={{ textAlign: 'center', mt: 2 }}>
            Don't have an account?{' '}
            <Link
              href="/signup"
              sx={{
                color: '#2563eb',
                cursor: 'pointer',
                textDecoration: 'none',
                fontWeight: 600,
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              Sign up
            </Link>
          </Typography>
        </Paper>
      </Container>
    </AuthLayout>
  );
};

export default LoginPage;
