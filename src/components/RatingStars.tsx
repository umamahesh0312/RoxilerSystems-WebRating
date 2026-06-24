import React from 'react';
import { Box, Rating as MuiRating, Typography } from '@mui/material';

interface RatingStarsProps {
  value: number;
  onChange?: (value: number) => void;
  readOnly?: boolean;
  size?: 'small' | 'medium' | 'large';
  showValue?: boolean;
}

export const RatingStars: React.FC<RatingStarsProps> = ({
  value,
  onChange,
  readOnly = false,
  size = 'medium',
  showValue = true,
}) => {
  return (
    <Box display="flex" alignItems="center" gap={1}>
      <MuiRating
        value={value}
        onChange={(_, newValue) => onChange?.(newValue || 0)}
        readOnly={readOnly}
        size={size}
      />
      {showValue && <Typography>{value.toFixed(1)}</Typography>}
    </Box>
  );
};

export default RatingStars;
