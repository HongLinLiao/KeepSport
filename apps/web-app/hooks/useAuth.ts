import {
  signIn as signInRequest,
  authentication as authenticationRequest,
  getUserInfoFromToken,
} from '@/requests/auth/auth';
import { SignInBody } from '@model';
import useRequest from './useRequest';
import useAuthCtx from '@/hooks/context/useAuth';

const useAuth = () => {
  const { fetch } = useRequest();
  const { setJwtToken } = useAuthCtx();

  const signIn = (data: SignInBody) => {
    return fetch(signInRequest(data));
  };

  const authentication = (token: string) => {
    return fetch(authenticationRequest(token));
  };

  const getUserInfo = () => {
    return fetch(getUserInfoFromToken());
  };

  const signOut = () => {
    setJwtToken(null);
  };

  return {
    signIn,
    authentication,
    signOut,
    getUserInfo,
  };
};

export default useAuth;
