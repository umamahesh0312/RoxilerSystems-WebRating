import React from 'react';
import { TextField, InputAdornment } from '@mui/material';
import type { ComponentProps } from 'react';
import SearchIcon from '@mui/icons-material/Search';

type SearchBarProps = Omit<ComponentProps<typeof TextField>, 'onChange'> & {
  onSearch?: (value: string) => void;
  placeholder?: string;
};

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = 'Search...',
  ...props
}) => {
  return (
    <TextField
      placeholder={placeholder}
      size="small"
      onChange={(e) => onSearch?.(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon sx={{ color: 'action.active', mr: 1 }} />
          </InputAdornment>
        ),
      }}
      {...props}
    />
  );
};

export default SearchBar;
