import AuthContext from '@/contexts/AuthContext';
import useAuth from '@/hooks/useAuth';
import useCookie from '@/hooks/useCookie';
import { UserInfo } from '@model';
import { FC, ReactNode, useEffect, useState } from 'react';

type Props = {
  children: ReactNode;
};

const AuthProvider: FC<Props> = ({ children }) => {
  const { token } = useCookie();
  const { authentication, getUserInfo } = useAuth();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [jwtToken, setJwtToken] = useState<string | null>();

  useEffect(() => {
    (async function () {
      const jwtToken = token.get();
      if (jwtToken) {
        const newToken = await authentication(jwtToken);
        setJwtToken(newToken);
      }
    })();
  }, [token, authentication]);

  useEffect(() => {
    (async function () {
      if (jwtToken) {
        const userInfoData = await getUserInfo(jwtToken);
        token.set(jwtToken);
        setUserInfo(userInfoData);
      } else if (jwtToken === null) {
        token.remove();
        setUserInfo(null);
      }
    })();
  }, [jwtToken, token, getUserInfo]);

  return (
    <AuthContext.Provider
      value={{
        userInfo,
        jwtToken,
        setJwtToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
