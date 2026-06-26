import React from 'react';
import { TextField } from '@mui/material';
import type { ComponentProps } from 'react';
type SearchBarProps = Omit<ComponentProps<typeof TextField>, 'onChange'> & {
    onSearch?: (value: string) => void;
    placeholder?: string;
};
export declare const SearchBar: React.FC<SearchBarProps>;
export default SearchBar;
