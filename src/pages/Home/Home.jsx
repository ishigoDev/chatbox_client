import React, { useState } from 'react';
import { Container } from '@mui/system';
import { Grid, Typography } from '@mui/material';
import './home.css';
import FormArea from '../../components/FormArea/FormArea';
import CBTextField from '../../components/CBTextField/CBTextField';
import CBButton from '../../components/CBButton/CBButton';
import signUp from '../../axios/signup';

function Home() {
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState(false);
  const [errorField, setErrorField] = useState('');
  const [helperText, setHelperText] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageError, setMessageError] = useState(false);
  const handleFullName = (e) => {
    setFullName(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const Fields = [
    {
      text: 'Full Name',
      handle: handleFullName,
    },
    {
      email: 'Email',
      handle: handleEmail,
    },
    {
      password: 'Password',
      handle: handlePassword,
    },
  ];
  const join = async () => {
    setMessageError(false);
    setMessage('');
    if (fullName.length === 0) {
      setError(true);
      setErrorField('Full Name');
      setHelperText('Full Name is Required');
    } else if (email.length === 0) {
      setError(true);
      setErrorField('Email');
      setHelperText('Email is Required');
    } else if (password.length === 0) {
      setError(true);
      setErrorField('Password');
      setHelperText('Password is Required');
    } else {
      setError(false);
      setErrorField('');
      setHelperText('');
      setLoading(true);
      try {
        const response = await signUp({ email, displayName: fullName, password });
        if (response.data.status === 200) {
          setMessage(response.data.message);
          setTimeout(() => {
            window.location.href = '/login';
          }, 1000);
        }
      } catch (error) {
        setMessageError(true);
        setMessage(error.response.data.message);
      }
      setLoading(false);
    }
  };
  return (
    <div style={{ background: '#ffcf5457' }} className="home-page">
      <Container component="main" className="home-page-container" fixed>
        <FormArea subheading="Welcome You">
          {message !== '' ? <div style={{ textAlign: 'center', width: '100%', margin: '10px 0' }}><Typography className={messageError ? 'message-error' : 'message'} variant="caption" gutterBottom>{message}</Typography></div> : null }
          {Fields.map((x, index) => (
            <Grid item xs={12} sm={12} lg={12} md={12} key={index}>
              <CBTextField
                variant="outlined"
                type={Object.keys(x)[0]}
                label={Object.values(x)}
                fullWidth
                required
                error={!!(error && Object.values(x)[0] === errorField)}
                helperText={error && Object.values(x)[0] === errorField && helperText !== '' ? helperText : null}
                onChange={(e) => { x.handle(e); }}
                {...x}
              />
            </Grid>
          ))}
          <Grid item xs={12} sm={12} lg={12} md={12}>
            <CBButton variant="contained" fullWidth size="large" onClick={join}>
              {loading ? 'Loading' : 'Join'}
            </CBButton>
          </Grid>
        </FormArea>
      </Container>
    </div>
  );
}

export default Home;
