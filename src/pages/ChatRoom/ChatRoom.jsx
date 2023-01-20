import React from 'react'
import { Grid, Typography, TextField } from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import SearchIcon from '@mui/icons-material/Search'
import CBSearch from '../../components/Search/CBSearch'
import './chatroom.css'
function ChatRoom() {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6} md={3} className="chatroom user-chat-list">
          <div className="user-chat-search-bar">
            <CBSearch
              className="user-chat-search"
              icon={<SearchIcon/>}
            />         
          </div>
          <div className="user-chat-list-card">
            <div>
            <AccountCircleIcon
              style={{ fontSize: '40px'}}
            />
            <Typography variant="h6" style={{ marginLeft: '12px' }}>
              Pranay pratap singh
            </Typography>
            </div>
            <div>
            <AccountCircleIcon
              style={{ fontSize: '40px'}}
            />
            <Typography variant="h6" style={{ marginLeft: '12px' }}>
              Pranay pratap singh
            </Typography>
            </div>
          </div>
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
        <Grid
          item
          xs={6}
          md={2}
          className="chatroom"
        >          
          <div className='user-chat-active-head'>
            <Typography variant='h6'>Active Users</Typography>
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
        </Grid>
      </Grid>
    </>
  )
}

export default ChatRoom
