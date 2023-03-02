import React from "react";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import "./header.css";
import { useLocation } from "react-router-dom";
import { menuItem } from "./Menu";
import HeaderLink from "../Link/HeaderLink";

function Header() {
  const { pathname } = useLocation();
  return (
    <AppBar position="sticky" className="header" sx={{ boxShadow: "0" }}>
      <Container maxWidth="xl" className="header-container">
        <Toolbar disableGutters className="header-wrapper">
          <Box
            sx={{ display: { xs: "none", md: "flex" }, width: { xs: "0" } }}
            className="menu"
          />
          <Box sx={{ marginLeft: { md: "135px" } }} className="header-logo">
            <div>
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  textDecoration: "none",
                  fontFamily: "Kanit !important",
                  fontWeight: 700,
                  color: "#000000",
                  fontSize: "40px",
                }}
              >
                ChatBox
              </Typography>
            </div>
          </Box>
          <Box
            sx={{ display: { xs: "flex", md: "flex" }, width: { xs: "10%" } }}
            className="menu"
          >
            {menuItem.find((x) => x.path === pathname) ? (
              menuItem
                .filter((x) => {
                  if (x.path !== pathname) {
                    return x;
                  }
                })
                .map((item, index) => (
                  <HeaderLink href={item.path} key={index + Math.random()} underline="hover">
                    {item.name}
                  </HeaderLink>
                ))
            ) : (
              <HeaderLink underline="hover">Sign Out</HeaderLink>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
