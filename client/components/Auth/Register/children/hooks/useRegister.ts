import { useAppDispatch } from '../../../../../redux/store';
import { register } from '../../../../../redux/slices/user';
import React from 'react';

type Props = {
  email: string;
  password: string;
  username: string;
  name: string;
};

type SubmitHandler = (
  e: React.FormEvent<HTMLFormElement>
) => Promise<void> | void;

const useRegister = ({ email, password, username, name }: Props) => {
  const dispatch = useAppDispatch();

  const submitHandler: SubmitHandler = (e) => {
    e.preventDefault();
    if (email && password) {
      dispatch(register({ email, password, username, name }));
    }
  };
  return { submitHandler };
};

export default useRegister;
