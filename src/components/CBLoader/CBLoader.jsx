import React from "react"
import CircularProgress from "@mui/material/CircularProgress";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ffcf54 !important",
    },
  },
});
function CBLoader() {
  return (
    <ThemeProvider theme={theme}>
      <CircularProgress color="primary" size="3rem" thickness="5" />
    </ThemeProvider>
  )
}

export default CBLoader