import { UserActionsTypes } from './user.types';
import axios from '../../../utils/axios';
import { dispatch } from '../../store';

export function login({ email, password }) {
  return async () => {
    try {
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
