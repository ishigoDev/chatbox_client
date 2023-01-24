import React from 'react'
import { Button } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
const theme = createTheme({
  palette: {
    primary: {
      main: 'rgb(255 220 128)',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: '#ffcf54 !important',
          },
        },
      },
    },
  },
})
function CBButton({ children, ...props }) {
  return (
    <ThemeProvider theme={theme}>
      <Button {...props}>{children}</Button>
    </ThemeProvider>
  )
}

export default CBButton
