import React from 'react'
import { Grid, Typography, TextField } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import './chatroom.css'
import AllUser from './AllUser'
import ActiveUser from './ActiveUser'
function ChatRoom() {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6} md={3} className="chatroom user-chat-list">
          <AllUser />
        </Grid>
        <Grid
          item
          xs={6}
          md={7}
          className="chatroom"
          style={{ background: 'green' }}
        >
          <div></div>
        </Grid>
        <Grid item xs={6} md={2} className="chatroom">
          <ActiveUser />
        </Grid>
      </Grid>
    </>
  )
}

export default ChatRoom
