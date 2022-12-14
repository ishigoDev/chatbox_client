import React from 'react'
import AppBar from '@mui/material/AppBar'
import Container from '@mui/material/Container'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import './header.css'
import { menuItem } from './Menu'
import HeaderLink from '../Link/HeaderLink'
function Header() {
  return (
    <AppBar position="static" className="header">
      <Container maxWidth="xl" className="header-container">
        <Toolbar disableGutters className="header-wrapper">
        <Box sx={{ display: { xs: 'none', md: 'flex' } , width:{xs:'0'} }} className="menu">            
          </Box>
          <Box sx={{marginLeft:{md:'135px'}}}>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              textDecoration: 'none',
              fontFamily: 'Inter Tight',
              fontWeight: 700,
              color: '#000000',
              fontSize: '25px',
            }}
          >
            ChatBox
          </Typography>
          </Box>         
          <Box sx={{ display: { xs: 'flex', md: 'flex' } , width:{xs:'10%'}}} className="menu">
            {menuItem.map((item, index) => {
              return (
                <HeaderLink href={item.path} key={index} underline="hover">
                  {item.name}
                </HeaderLink>
              )
            })}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Header
