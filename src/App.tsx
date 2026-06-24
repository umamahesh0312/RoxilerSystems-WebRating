import React from 'react';
import { AuthProvider } from '@/context/AuthContext';
import { ThemeProvider } from '@/theme/theme';
import AppRoutes from '@/routes/AppRoutes';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
