import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Typography,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import StorefrontIcon from '@mui/icons-material/Storefront';
import RateReviewIcon from '@mui/icons-material/RateReview';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { UserRole } from '@/types';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

interface MenuItem {
  icon: React.ReactNode;
  label: string;
  path: string;
  roles: UserRole[];
}

const adminMenuItems: MenuItem[] = [
  { icon: <DashboardIcon />, label: 'Dashboard', path: '/admin/dashboard', roles: [UserRole.SYSTEM_ADMIN] },
  { icon: <PeopleIcon />, label: 'Users', path: '/admin/users', roles: [UserRole.SYSTEM_ADMIN] },
  { icon: <StorefrontIcon />, label: 'Stores', path: '/admin/stores', roles: [UserRole.SYSTEM_ADMIN] },
  { icon: <SettingsIcon />, label: 'Settings', path: '/admin/settings', roles: [UserRole.SYSTEM_ADMIN] },
];

const userMenuItems: MenuItem[] = [
  { icon: <DashboardIcon />, label: 'Dashboard', path: '/user/dashboard', roles: [UserRole.NORMAL_USER] },
  { icon: <StorefrontIcon />, label: 'Stores', path: '/user/stores', roles: [UserRole.NORMAL_USER] },
];

const ownerMenuItems: MenuItem[] = [
  { icon: <DashboardIcon />, label: 'Dashboard', path: '/owner/dashboard', roles: [UserRole.STORE_OWNER] },
  { icon: <RateReviewIcon />, label: 'Ratings', path: '/owner/ratings', roles: [UserRole.STORE_OWNER] },
];

export const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  let menuItems: MenuItem[] = [];
  if (user?.role === UserRole.SYSTEM_ADMIN) {
    menuItems = adminMenuItems;
  } else if (user?.role === UserRole.NORMAL_USER) {
    menuItems = userMenuItems;
  } else if (user?.role === UserRole.STORE_OWNER) {
    menuItems = ownerMenuItems;
  }

  const filteredItems = menuItems.filter(item =>
    item.roles.includes(user?.role as UserRole)
  );

  const handleNavigate = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          width: 280,
          backgroundColor: '#f9fafb',
          borderRight: '1px solid #e5e7eb',
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, color: '#2563eb' }}>
          StoreRating
        </Typography>
        <Typography variant="caption" color="textSecondary">
          {user?.role}
        </Typography>
      </Box>
      <Divider />
      <List>
        {filteredItems.map((item) => (
          <ListItem key={item.path} disablePadding>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => handleNavigate(item.path)}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: '#eff6ff',
                  color: '#2563eb',
                  '& .MuiListItemIcon-root': {
                    color: '#2563eb',
                  },
                },
                '&:hover': {
                  backgroundColor: '#f3f4f6',
                },
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
