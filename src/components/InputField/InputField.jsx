import React from 'react'
import Input from '@mui/material/Input';
import { createTheme, ThemeProvider } from '@mui/material/styles';
const theme = createTheme({
    components: {
        MuiInput:{
            styleOverrides:{
            root:{
                '::after':{
                    borderBottom: '2px solid #ffcf54'
                }
            }   
        } 
        }       
    }
})
function InputField(props) {
  return (
    <ThemeProvider theme={theme}>
        <Input {...props} />
    </ThemeProvider>
  )
}

export default InputField