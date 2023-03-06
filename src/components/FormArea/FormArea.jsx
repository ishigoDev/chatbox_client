import React from "react";
import Box from "@mui/material/Box";
import { Grid, Typography } from "@mui/material";
import "./formarea.css";

function FormArea(props) {
  return (
    <Box
      sx={{
        width: { md: "400px" },
        background: "white",
        padding: "20px",
        borderRadius: "3px",
      }}
      className="sign-Form"
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} lg={12} md={12} className="logo-container">
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              textDecoration: "none",
              fontFamily: "Kanit !important",
              fontWeight: 700,
              color: "#ffcf54 !important",
              fontSize: "35px",
            }}
          >
            ChatBox
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} lg={12} md={12} className="form-subcontainer">
          <Typography variant="p" className="form-subtext">{props.subheading}</Typography>
        </Grid>
        {props.children}
      </Grid>
    </Box>
  );
}

export default FormArea;
