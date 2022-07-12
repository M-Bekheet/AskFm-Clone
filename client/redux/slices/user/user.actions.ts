import { UserActionsTypes } from './user.types';
import axios from '../../../utils/axios';
import { dispatch } from '../../store';

type Credentials = { email: string; password: string };

export function login({ email, password }: Credentials) {
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
