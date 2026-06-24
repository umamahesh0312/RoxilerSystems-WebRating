import React, { useState } from 'react';
import { Box } from '@mui/material';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} showMenu />
        <Box
          component="main"
          sx={{
            flex: 1,
            overflow: 'auto',
            p: { xs: 2, sm: 3 },
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default AdminLayout;
