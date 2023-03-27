import React from "react";
import { Container, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function ActiveUser({activeUsers}) {
  return (
    <Container>
      <div className="user-chat-active-head">
        <Typography variant="h6">Active Users</Typography>
      </div>
      <div className="user-chat-list-card">
        {activeUsers.length !== 0 && activeUsers.map((user)=>{
          return (<div className="user-chat-list-card-container">
          <AccountCircleIcon style={{ marginLeft: "5px" }} />
          <Typography variant="body1" style={{ marginLeft: "12px" }}>
            {user.name}
          </Typography>
        </div>)
        })}   
        {activeUsers.length === 0 && (
          <div className="user-chat-list-card-container">         
          <Typography variant="body1" style={{ marginLeft: "12px" }}>
            No Users Online
          </Typography>
        </div>
        )}     
      </div>
    </Container>
  );
}

export default ActiveUser;
