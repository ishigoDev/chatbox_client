import React,{useState} from 'react'
import { Container } from '@mui/system'
import { Grid , Typography } from '@mui/material'
import CBTextField from '../../components/CBTextField/CBTextField'
import FormArea from '../../components/FormArea/FormArea'
import CBButton from '../../components/CBButton/CBButton'
import './login.css';
import {login} from '../../axios/login';
import { getToken, saveStorage } from '../../utils/localStorage'

function Login() {
  if(getToken()){
    window.location.href='/chatroom'
  }
  const [loading,setLoading] = useState(false);  
  const [error,setError]=useState(false);
  const [errorField,setErrorField]=useState('');
  const [helperText,setHelperText]= useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [message,setMessage] = useState('')
  const [messageError,setMessageError] = useState(false)
  const handleEmail= (e)=>{
    setEmail(e.target.value);    
  }  
  const handlePassword = (e)=>{
    setPassword(e.target.value);    
  }  
  const Fields = [
    {
      email: 'Email',
      handle:handleEmail,
    },
    {
      password: 'Password',
      handle:handlePassword
    },
  ];
 
  const loginHandle = async ()=>{
    setMessageError(false);
    setMessage('');
    if(email.length == 0){
      setError(true);
      setErrorField('Email');
      setHelperText('Email is Required')
    }else if(password.length == 0){
      setError(true);
      setErrorField('Password');
      setHelperText('Password is Required')
    }else{
      setError(false)
      setErrorField('');
      setHelperText('')
      setLoading(true);
      try{
        const response  = await login({'email':email,'password':password});
        if(response.data.status == 200){
          saveStorage('token',response.data.token);
          saveStorage('userId',response.data.userId);
          window.location.href="/chatroom"          
        }
      }catch(error){
        setMessageError(true);
        setMessage(error.response.data.message);
      }
      setLoading(false);
    }
  } 
  return (
    <div style={{ background: '#ffcf5457' }} className="login-page">
      <Container component="main" className="login-page-container" fixed>
        <FormArea subheading="Let's Move inside">
        {message !== '' ? <div style={{textAlign:'center',width:'100%',margin:'10px 0'}}><Typography className={messageError ? 'message-error':'message'} variant="caption"  gutterBottom >{message}</Typography></div>: null }
          {Fields.map((x, index) => {
            return (
              <Grid item xs={12} sm={12} lg={12} md={12} key={index}>
                <CBTextField
                  variant="outlined"
                  type={Object.keys(x)[0]}
                  label={Object.values(x)}
                  fullWidth
                  required
                  error={error && Object.values(x)[0] == errorField ? true : false }
                  helperText={error && Object.values(x)[0] == errorField && helperText !== ''?helperText:null}
                  onChange={(e)=>{x.handle(e)}}                        
                  {...x}                    
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
