import React from "react";
import { Container, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function ActiveUser() {
  return (
    <Container>
      <div className="user-chat-active-head">
        <Typography variant="h6">Active Users</Typography>
      </div>
      <div className="user-chat-list-card">
        <div className="user-chat-list-card-container">
          <AccountCircleIcon style={{ marginLeft: "5px" }} />
          <Typography variant="body1" style={{ marginLeft: "12px" }}>
            Pranay pratap singh
          </Typography>
        </div>
        <div className="user-chat-list-card-container">
          <AccountCircleIcon style={{ marginLeft: "5px" }} />
          <Typography variant="body1" style={{ marginLeft: "12px" }}>
            Pranay pratap singh
          </Typography>
        </div>
      </div>
    </Container>
  );
}

export default ActiveUser;
