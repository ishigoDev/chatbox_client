import React from 'react';
import Box from '@mui/material/Box';
import {Grid, Typography} from '@mui/material'

function FormArea(props) {
    console.log(props);
  return (
    <Box sx={{width:{md:'400px'},background:'white',padding:'20px'}} className="sign-Form">
        <Grid container spacing={2}>
        <Grid item xs={12} sm={6} lg={12} md={12}>                
              <Typography>ChatBox Waiting For You ! SignUp</Typography>
        </Grid>
        {props.children}
        </Grid>
    </Box>
  )
}

export default FormArea