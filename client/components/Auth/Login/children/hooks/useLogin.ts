import { useDispatch } from '../../../../../redux/store';
import { login } from '../../../../../redux/slices/user';

type Props = {
  email: string;
  password: string;
};

const useLogin = ({ email, password }: Props): Promise<any> => {
  let isSubmitting = false;
  const dispatch = useDispatch();

  const submitHandler = (e: any) => {
    e.preventDefault();
    if (email && password) {
      isSubmitting = true;
      dispatch(login({ email, password }));
      isSubmitting = false;
    }
  };
  return { submitHandler, isSubmitting };
};

export default useLogin;
