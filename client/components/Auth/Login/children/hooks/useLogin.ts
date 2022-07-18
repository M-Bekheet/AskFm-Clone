import { useAppDispatch } from 'redux/store';
import { login } from 'redux/slices/user';
import React from 'react';

type Props = {
  email: string;
  password: string;
};

type SubmitHandler = (
  e: React.FormEvent<HTMLFormElement>
) => Promise<void> | void;

const useLogin = ({ email, password }: Props) => {
  const dispatch = useAppDispatch();

  const submitHandler: SubmitHandler = (e) => {
    e.preventDefault();
    if (email && password) {
      dispatch(login({ email, password }));
    }
  };
  return { submitHandler };
};

export default useLogin;
