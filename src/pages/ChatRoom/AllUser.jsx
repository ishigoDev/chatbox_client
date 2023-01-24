import React from 'react';
import SearchIcon from '@mui/icons-material/Search'
import CBSearch from '../../components/Search/CBSearch'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { Grid, Typography, TextField } from '@mui/material'

function AllUser() {
  return (
    <>
        <div className="user-chat-search-bar">
          <CBSearch className="user-chat-search" icon={<SearchIcon />} />
        </div>
        <div className="user-chat-list-card">
          <div>
            <AccountCircleIcon style={{ fontSize: '40px' }} />
            <Typography variant="h6" style={{ marginLeft: '12px' }}>
              Pranay pratap singh
            </Typography>
          </div>
          <div>
            <AccountCircleIcon style={{ fontSize: '40px' }} />
            <Typography variant="h6" style={{ marginLeft: '12px' }}>
              Pranay pratap singh
            </Typography>
          </div>
        </div>
    </>
  )
}

export default AllUser
