import React from 'react'
import AppBar from '@mui/material/AppBar'
import Container from '@mui/material/Container'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import './header.css'
import { menuItem } from './Menu'
import HeaderLink from '../Link/HeaderLink'
import Button from '@mui/material/Button'
function Header() {
  return (
    <AppBar position="static" className="header">
      <Container maxWidth="xl" className="header-container">
        <Toolbar disableGutters className="header-wrapper">
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
            FindYourMaid
          </Typography>
          <Box sx={{ display: { xs: 'flex', md: 'flex' } }} className="menu">
            {menuItem.map((item, index) => {
              return (
                <HeaderLink href={item.path} key={index} underline="hover">
                  {item.name}
                </HeaderLink>
              )
            })}
            <Button variant="contained">Need Work</Button>
            <Button variant="contained">Login</Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Header
