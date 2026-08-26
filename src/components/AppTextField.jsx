import React from 'react';
import TextField from '@mui/material/TextField';
import { useTheme } from '../hooks/useTheme';

const AppTextField = ({
  label,
  type = 'text',
  value,
  onChange,
  error,
  helperText,
  sx = {},
  ...props
}) => {
  const { mode } = useTheme();
  const isDark = mode === 'dark';

  return (
    <TextField
      fullWidth
      variant="outlined"
      label={label}
      type={type}
      value={value}
      onChange={onChange}
      error={error}
      helperText={helperText}
      sx={{
        marginBottom: '16px',
        '& .MuiOutlinedInput-root': {
          color: isDark ? '#ffffff' : '#000000',
          '& fieldset': {
            borderColor: isDark ? '#555555' : '#cccccc',
          },
          '&:hover fieldset': {
            borderColor: isDark ? '#888888' : '#999999',
          },
        },
        '& .MuiInputLabel-root': {
          color: isDark ? '#aaaaaa' : '#666666',
        },
        ...sx,
      }}
      {...props}
    />
  );
};

export default AppTextField;