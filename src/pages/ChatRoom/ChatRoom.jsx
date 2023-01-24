import React from 'react'
import { Grid, Typography } from '@mui/material'
import './chatroom.css'
import AllUser from './AllUser'
import ActiveUser from './ActiveUser'
import SpeakerNotesIcon from '@mui/icons-material/SpeakerNotes'
function ChatRoom() {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6} md={3} className="chatroom user-chat-list">
          <AllUser />
        </Grid>
        <Grid item xs={6} md={7} className="chatroom chatroom-message-containter">
          <div className="welcome-page-chatroom">
            <div className="chat-message">
              <SpeakerNotesIcon className="chatroom-msg-icon"/>
              <Typography variant="h4">Welcome to ChatRoom</Typography>
            </div>
          </div>
        </Grid>
        <Grid item xs={6} md={2} className="chatroom">
          <ActiveUser />
        </Grid>
      </Grid>
    </>
  )
}

export default ChatRoom
