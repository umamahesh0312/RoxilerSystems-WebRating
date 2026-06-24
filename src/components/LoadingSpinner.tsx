import React from 'react';
import {
  CircularProgress,
  Box,
  BoxProps,
} from '@mui/material';

interface LoadingSpinnerProps extends BoxProps {
  size?: number;
  thickness?: number;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 40,
  thickness = 4,
  ...boxProps
}) => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    minHeight="200px"
    {...boxProps}
  >
    <CircularProgress size={size} thickness={thickness} />
  </Box>
);

export default LoadingSpinner;
