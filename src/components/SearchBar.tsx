import React from 'react';
import {
  TextField,
  InputAdornment,
  TextFieldProps,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface SearchBarProps extends TextFieldProps {
  onSearch?: (value: string) => void;
  placeholder?: string;
}

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
