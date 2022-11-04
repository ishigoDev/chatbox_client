import React from 'react';
import { Container } from '@mui/system'; 
import { Grid, InputLabel  } from '@mui/material';
import InputField from '../../components/InputField/InputField';
import './home.css';
import FormArea from '../../components/FormArea/FormArea';
function Home() {
  return (
    <div style={{background:'#ffcf5457'}} className="home-page">
        <Container component="main" className="home-page-container" fixed>
        <FormArea>            
            <Grid item xs={12} sm={6} lg={12} md={12}>                
              <InputField label="Name" placeholder='Enter Your Name' fullWidth />
            </Grid>
            <Grid item xs={12} sm={6} lg={12} md={12}>                
              <InputField label="Email" placeholder='Enter Your Email' fullWidth />
            </Grid>
            <Grid item xs={12} sm={6} lg={12} md={12}>                
              <InputField label="Password" placeholder='Enter Your Password' fullWidth />
            </Grid>
            <Grid item xs={12} sm={6} lg={12} md={12}>                
              <InputField label="Password" placeholder='Enter Your Password' fullWidth />
            </Grid>            
        </FormArea>
        </Container>
    </div>
  )
}

export default Home    