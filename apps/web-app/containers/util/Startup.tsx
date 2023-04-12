import useAuth from '@/hooks/useAuth';
import useAuthCtx from '@/hooks/context/useAuth';
import useCookie from '@/hooks/useCookie';
import { FC, ReactNode, useEffect } from 'react';
import Drawer from '../layout/Drawer';

type Props = {
  children: ReactNode;
};

const Startup: FC<Props> = ({ children }) => {
  const { token } = useCookie();
  const { authentication, getUserInfo } = useAuth();
  const { setJwtToken, setUserInfo, jwtToken } = useAuthCtx();

  useEffect(() => {
    (async function () {
      const jwtToken = token.get();
      if (jwtToken) {
        const token = await authentication(jwtToken);
        setJwtToken(token);
      }
    })();
  }, []);

  useEffect(() => {
    (async function () {
      if (jwtToken) {
        const userInfoData = await getUserInfo();
        token.set(jwtToken);
        setUserInfo(userInfoData);
      } else if (jwtToken === null) {
        token.remove();
        setUserInfo(null);
      }
    })();
  }, [jwtToken]);

  return (
    <>
      {children}
      <Drawer />
    </>
  );
};

export default Startup;