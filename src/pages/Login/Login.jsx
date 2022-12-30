import React from 'react'
import { Container } from '@mui/system'
import { Grid } from '@mui/material'
import CBTextField from '../../components/CBTextField/CBTextField'
import FormArea from '../../components/FormArea/FormArea'
import CBButton from '../../components/CBButton/CBButton'
import './login.css';
import {login} from '../../axios/login';

function Login() {
  const Fields = [
    {
      email: 'Email',
    },
    {
      password: 'Password',
    },
  ]
  const loginHandle = async ()=>{
    const hello  = await login();
  } 
  return (
    <div style={{ background: '#ffcf5457' }} className="login-page">
      <Container component="main" className="login-page-container" fixed>
        <FormArea subheading="Let's Move inside">
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
            <CBButton variant="contained" fullWidth size="large" onClick={loginHandle}>
              Login
            </CBButton>
          </Grid>
        </FormArea>
      </Container>
    </div>
  )
}

export default Login
