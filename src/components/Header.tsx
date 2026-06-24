import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Avatar,
  Stack,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  onMenuClick?: () => void;
  showMenu?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick, showMenu = true }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleProfileClick2 = () => {
    const roleBasedProfile = user?.role === 'STORE_OWNER' ? '/owner/profile' : '/user/profile';
    navigate(roleBasedProfile);
    handleProfileClose();
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: '#ffffff',
        color: '#000000',
        borderBottom: '1px solid #e5e7eb',
      }}
    >
      <Toolbar>
        {showMenu && (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={onMenuClick}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}

        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700, color: '#2563eb' }}>
          StoreRating
        </Typography>

        <Stack direction="row" alignItems="center" spacing={2}>
          <Typography variant="body2" color="textSecondary">
            {user?.name}
          </Typography>
          <IconButton
            onClick={handleProfileClick}
            sx={{ p: 0 }}
          >
            <Avatar sx={{ width: 32, height: 32, backgroundColor: '#2563eb' }}>
              {user?.name?.charAt(0).toUpperCase()}
            </Avatar>
          </IconButton>
        </Stack>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleProfileClose}
        >
          <MenuItem onClick={handleProfileClick2} sx={{ gap: 1 }}>
            <AccountCircleIcon fontSize="small" />
            Profile
          </MenuItem>
          <MenuItem onClick={handleLogout} sx={{ gap: 1 }}>
            <LogoutIcon fontSize="small" />
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
