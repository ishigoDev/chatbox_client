import React from 'react'
import { Container } from '@mui/system'
import { Grid } from '@mui/material'
import './home.css'
import FormArea from '../../components/FormArea/FormArea'
import CBTextField from '../../components/CBTextField/CBTextField'
import CBButton from '../../components/CBButton/CBButton'

function Home() {
  const Fields = [
    {
      text: 'Full Name',
    },
    {
      email: 'Email',
    },
    {
      password: 'Password',
    },
  ]
  return (
    <div style={{ background: '#ffcf5457' }} className="home-page">
      <Container component="main" className="home-page-container" fixed>
        <FormArea subheading="Welcome You">
          {Fields.map((x, index) => {
            return (
              <Grid item xs={12} sm={12} lg={12} md={12} key={index}>
                <CBTextField
                  variant="outlined"
                  type={Object.keys(x)}
                  label={Object.values(x)}
                  fullWidth
                />
              </Grid>
            )
          })}
          <Grid item xs={12} sm={12} lg={12} md={12}>
            <CBButton variant="contained" fullWidth size="large">
              Join
            </CBButton>
          </Grid>
        </FormArea>
      </Container>
    </div>
  )
}

export default Home
