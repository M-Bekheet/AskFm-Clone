import { useAppSelector } from 'redux/store';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { paths } from '@constants';

type Props = { children: JSX.Element };

const AuthGuard = ({ children }: Props) => {
  const router = useRouter();

  const isAuth = useAppSelector((state) => state.user.isAuth);

  useEffect(() => {
    if (
      !isAuth &&
      router.route !== paths.LOGIN_PATH &&
      router.route !== paths.REGISTER_PATH
    ) {
      router.push(paths.LOGIN_PATH);
    } else if (
      isAuth &&
      (router.route === paths.LOGIN_PATH ||
        router.route === paths.REGISTER_PATH)
    ) {
      router.push(paths.TIMELINE_PATH);
    }
  }, [isAuth, router]);

  return children;
};
export default AuthGuard;
