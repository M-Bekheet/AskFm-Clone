import React from 'react';
// @mui
import { Container } from '@mui/material';
// children components
import RegisterForm from './children/RegisterForm';

const Register = () => {
  return (
    <Container maxWidth="md">
      <RegisterForm />
    </Container>
  );
};

export default Register;
