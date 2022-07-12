import { UserActionsTypes } from './user.types';
import axios from '../../../utils/axios';
import { dispatch } from '../../store';

type LoginCredentials = { email: string; password: string };
type RegisterCredentials = {
  email: string;
  password: string;
  username: string;
  name: string;
};

export function login({ email, password }: LoginCredentials) {
  return async () => {
    try {
      dispatch({
        type: UserActionsTypes.IS_LOADING,
      });
      const res = await axios.post('users/login', { email, password });
      dispatch({
        type: UserActionsTypes.LOGIN,
        payload: res.data,
      });
    } catch (err) {
      console.error({ err });
      dispatch({
        type: UserActionsTypes.HAS_ERROR,
        payload: err,
      });
    }
  };
}
export function register({
  email,
  password,
  username,
  name,
}: RegisterCredentials) {
  return async () => {
    try {
      dispatch({
        type: UserActionsTypes.IS_LOADING,
      });
      const res = await axios.post('users/create', {
        email,
        password,
        username,
        name,
      });

      dispatch({
        type: UserActionsTypes.REGISTER,
        payload: res.data,
      });
    } catch (err) {
      console.error({ err });
      dispatch({
        type: UserActionsTypes.HAS_ERROR,
        payload: err,
      });
    }
  };
}
