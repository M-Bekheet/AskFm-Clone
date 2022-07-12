import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { useAppSelector, useAppDispatch } from '../../redux/store';
import { logout } from '../../redux/slices/user/user.actions';
import { paths } from '../../constants';

const Timeline = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const router = useRouter();
  const dispatch = useAppDispatch();

  const userDetails = useAppSelector((state) => state.user.userDetails);
  const handleLogout = () => {
    router.push(paths.LOGIN_PATH);
    dispatch(logout());
  };

  return (
    mounted && (
      <div>
        <h1>Welcome {userDetails?.name}</h1>
        <div>
          <div>
            <button type="button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    )
  );
};
export default Timeline;
