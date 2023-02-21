import React from 'react';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: 'rgb(255 220 128)',
    },
  },
});
function CBTextField(props) {
  return (
    <ThemeProvider theme={theme}>
      <TextField {...props} />
    </ThemeProvider>
  );
}

export default CBTextField;
