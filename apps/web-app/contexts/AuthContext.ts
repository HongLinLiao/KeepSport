import { UserInfo } from '@model';
import { createContext } from 'react';

interface IAuthContext {
  jwtToken: string | null;
  setJwtToken: (token: string) => unknown;
  userInfo: UserInfo | null;
}

const AuthContext = createContext<IAuthContext>({
  jwtToken: null,
  setJwtToken: () => null,
  userInfo: null,
});

export default AuthContext;
