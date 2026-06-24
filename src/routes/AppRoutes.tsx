import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Components
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { RoleGuard } from '@/components/RoleGuard';

// Pages - Auth
import { LoginPage } from '@/pages/auth/LoginPage';
import { SignupPage } from '@/pages/auth/SignupPage';

// Pages - Admin
import { AdminDashboard } from '@/pages/admin/AdminDashboard';
import { AdminUsersPage } from '@/pages/admin/AdminUsersPage';
import { AdminUserDetailsPage } from '@/pages/admin/AdminUserDetailsPage';
import { AdminStoresPage } from '@/pages/admin/AdminStoresPage';
import { AdminStoreDetailsPage } from '@/pages/admin/AdminStoreDetailsPage';
import { AdminAddUserPage } from '@/pages/admin/AdminAddUserPage';
import { AdminAddStorePage } from '@/pages/admin/AdminAddStorePage';

// Pages - User
import { UserDashboard } from '@/pages/user/UserDashboard';
import { UserStoresPage } from '@/pages/user/UserStoresPage';
import { UserProfilePage } from '@/pages/user/UserProfilePage';

// Pages - Store Owner
import { StoreOwnerDashboard } from '@/pages/owner/StoreOwnerDashboard';
import { StoreOwnerProfilePage } from '@/pages/owner/StoreOwnerProfilePage';

// Types
import { UserRole } from '@/types';

export const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <RoleGuard allowedRoles={[UserRole.SYSTEM_ADMIN]}>
                <AdminDashboard />
              </RoleGuard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute>
              <RoleGuard allowedRoles={[UserRole.SYSTEM_ADMIN]}>
                <AdminUsersPage />
              </RoleGuard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users/:id"
          element={
            <ProtectedRoute>
              <RoleGuard allowedRoles={[UserRole.SYSTEM_ADMIN]}>
                <AdminUserDetailsPage />
              </RoleGuard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/stores"
          element={
            <ProtectedRoute>
              <RoleGuard allowedRoles={[UserRole.SYSTEM_ADMIN]}>
                <AdminStoresPage />
              </RoleGuard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/stores/:id"
          element={
            <ProtectedRoute>
              <RoleGuard allowedRoles={[UserRole.SYSTEM_ADMIN]}>
                <AdminStoreDetailsPage />
              </RoleGuard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/add-user"
          element={
            <ProtectedRoute>
              <RoleGuard allowedRoles={[UserRole.SYSTEM_ADMIN]}>
                <AdminAddUserPage />
              </RoleGuard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/add-store"
          element={
            <ProtectedRoute>
              <RoleGuard allowedRoles={[UserRole.SYSTEM_ADMIN]}>
                <AdminAddStorePage />
              </RoleGuard>
            </ProtectedRoute>
          }
        />

        {/* User Routes */}
        <Route
          path="/user/dashboard"
          element={
            <ProtectedRoute>
              <RoleGuard allowedRoles={[UserRole.NORMAL_USER]}>
                <UserDashboard />
              </RoleGuard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/stores"
          element={
            <ProtectedRoute>
              <RoleGuard allowedRoles={[UserRole.NORMAL_USER]}>
                <UserStoresPage />
              </RoleGuard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/profile"
          element={
            <ProtectedRoute>
              <RoleGuard allowedRoles={[UserRole.NORMAL_USER]}>
                <UserProfilePage />
              </RoleGuard>
            </ProtectedRoute>
          }
        />

        {/* Store Owner Routes */}
        <Route
          path="/owner/dashboard"
          element={
            <ProtectedRoute>
              <RoleGuard allowedRoles={[UserRole.STORE_OWNER]}>
                <StoreOwnerDashboard />
              </RoleGuard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/owner/profile"
          element={
            <ProtectedRoute>
              <RoleGuard allowedRoles={[UserRole.STORE_OWNER]}>
                <StoreOwnerProfilePage />
              </RoleGuard>
            </ProtectedRoute>
          }
        />

        {/* Catch All */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
