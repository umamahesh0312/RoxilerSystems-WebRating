import React from 'react';
import { Box } from '@mui/material';
import { Header } from '@/components/Header';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      <Header showMenu={false} />
      <Box component="main" sx={{ p: { xs: 2, sm: 3 } }}>
        {children}
      </Box>
    </Box>
  );
};

export default AuthLayout;
