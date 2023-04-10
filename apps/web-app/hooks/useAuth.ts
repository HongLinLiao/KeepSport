import { useRouter } from 'next/router';
import useAuthCtx from '@/hooks/context/useAuth';
import { useCallback } from 'react';
import {
  signIn as signInRequest,
  authentication as authenticationRequest,
  getUserInfoFromToken,
} from '@/requests/auth/auth';
import { SignInBody } from '@model';
import useRequest from './useRequest';

const useAuth = () => {
  const { fetch } = useRequest();
  const { setJwtToken } = useAuthCtx();

  const signIn = useCallback(
    (data: SignInBody) => {
      return fetch(signInRequest(data)).then((token) => {
        setJwtToken(token);
        return token;
      });
    },
    [fetch, setJwtToken]
  );

  const authentication = useCallback(
    (token: string) => {
      return fetch(authenticationRequest({ token })).then((token) => {
        setJwtToken(token);
        return token;
      });
    },
    [fetch, setJwtToken]
  );

  const getUserInfo = useCallback(
    (token: string) => {
      return fetch(getUserInfoFromToken(token));
    },
    [fetch]
  );

  const signOut = useCallback(() => {
    setJwtToken(null);
  }, [setJwtToken]);

  return {
    signIn,
    authentication,
    signOut,
    getUserInfo,
  };
};

export default useAuth;
