import React from 'react';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  components: {
    MuiLink: {
      styleOverrides: {
        root: {
          color: '#000000',
          position: 'relative',
          fontWeight: '500',
        },
        underlineHover: {
          '::before': {
            content: "''",
            position: 'absolute',
            display: 'block',
            width: '100%',
            height: '1.5px',
            bottom: 0,
            left: 0,
            backgroundColor: '#000',
            transform: 'scaleX(0)',
            transition: 'transform 0.3s ease',
          },
          ':hover': {
            textDecoration: 'none',
          },
          ':hover::before': {
            transform: 'scaleX(1)',
          },
        },
      },
    },
  },
});
function HeaderLink({ href, children, ...props }) {
  return (
    <ThemeProvider theme={theme}>
      <Link href={href} {...props}>{children}</Link>
    </ThemeProvider>
  );
}

export default HeaderLink;
