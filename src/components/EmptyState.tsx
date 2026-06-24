import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface EmptyStateProps {
  title: string;
  message: string;
  actionLabel?: string;
  actionUrl?: string;
  icon?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  message,
  actionLabel,
  actionUrl,
  icon,
}) => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="400px"
        textAlign="center"
        gap={2}
      >
        {icon && <Box sx={{ fontSize: 60 }}>{icon}</Box>}
        <Typography variant="h5" fontWeight={600}>
          {title}
        </Typography>
        <Typography color="textSecondary">{message}</Typography>
        {actionLabel && actionUrl && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate(actionUrl)}
            sx={{ mt: 2 }}
          >
            {actionLabel}
          </Button>
        )}
      </Box>
    </Container>
  );
};

export default EmptyState;
