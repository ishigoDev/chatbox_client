import React from 'react';
import { Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function ActiveUser() {
  return (
    <>
      <div className="user-chat-active-head">
        <Typography variant="h6">Active Users</Typography>
      </div>
      <div className="user-chat-list-card">
        <div className="user-chat-list-card-container">
          <AccountCircleIcon style={{ marginLeft: '5px' }} />
          <Typography variant="body1" style={{ marginLeft: '12px' }}>
            Pranay pratap singh
          </Typography>
        </div>
        <div className="user-chat-list-card-container">
          <AccountCircleIcon style={{ marginLeft: '5px' }} />
          <Typography variant="body1" style={{ marginLeft: '12px' }}>
            Pranay pratap singh
          </Typography>
        </div>
      </div>
    </>
  );
}

export default ActiveUser;
