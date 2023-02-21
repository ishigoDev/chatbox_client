import React from 'react';
import { TextField } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: 'rgb(255 220 128)',
    },
  },
});
function CBSearch({ className, icon, ...props }) {
  return (
    <ThemeProvider theme={theme}>
      <TextField
        className={className}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              {icon}
            </InputAdornment>
          ),
        }}
        variant="standard"
        {...props}
      />
    </ThemeProvider>
  );
}

export default CBSearch;
