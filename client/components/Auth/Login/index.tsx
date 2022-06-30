import React from 'react';
// @mui
import { Container } from '@mui/material';
// children components
import LoginForm from './children/LoginForm';

const Login = () => {
  return (
    <Container maxWidth="md">
      <LoginForm />
    </Container>
  );
};

export default Login;
