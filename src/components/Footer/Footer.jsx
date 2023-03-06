import React from "react";
import { Container, Typography } from "@mui/material";
import { Box } from "@mui/system";

function Footer() {
  return (
    <Box sx={{ background: "#ffcf5457" }}>
      <Container component="main" sx={{ display: "flex", justifyContent: "center", alignItem: "center" }}>
        <Typography variant="p" component="p" gutterBottom>
          Made with ❤️ by Pranay
        </Typography>
      </Container>
    </Box>

  );
}

export default Footer;
