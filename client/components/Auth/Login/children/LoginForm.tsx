// react
import React, { useState, ChangeEventHandler } from 'react';
// @mui
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
import { LoadingButton } from '@mui/lab';
// hooks
import useLogin from './hooks/useLogin';
import { useAppSelector } from '../../../../redux/store';

// type HandleChange: ChangeEventHandler = ({ target }) => void;

export default function LoginForm() {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const isLoading = useAppSelector((state) => state.user.isLoading);

  const { submitHandler } = useLogin({
    email,
    password,
  });

  const handleEmail: ChangeEventHandler = ({ currentTarget }) =>
    setEmail((currentTarget as HTMLInputElement).value);
  const handlePassword: ChangeEventHandler = ({ currentTarget }) =>
    setPassword((currentTarget as HTMLInputElement).value);

  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
      onSubmit={submitHandler}
    >
      <TextField
        id="email_input"
        type="email"
        label="Email"
        name="email"
        variant="standard"
        value={email}
        onChange={handleEmail}
      />
      <TextField
        id="password_input"
        type="password"
        name="password"
        label="Password"
        value={password}
        onChange={handlePassword}
        variant="standard"
      />
      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={isLoading}
        sx={{ borderRadius: 3, boxShadow: 'none' }}
      >
        Login
      </LoadingButton>
    </Box>
  );
}
