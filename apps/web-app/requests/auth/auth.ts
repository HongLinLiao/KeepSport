import { requestWrapper } from '../request';
import { SignInBody, UserInfo } from '@model';

export const signIn = (data: SignInBody) => {
  return requestWrapper<string>(
    {
      url: '/api/internal/auth/signIn',
      method: 'POST',
      data,
    },
    { isPublic: true }
  );
};

export const authentication = (data: { token: string }) => {
  return requestWrapper<string>(
    {
      url: '/api/internal/auth/authentication',
      method: 'POST',
      data,
    },
    { isPublic: true }
  );
};

export const getUserInfoFromToken = (token: string) => {
  return requestWrapper<UserInfo>(
    {
      url: '/api/internal/user/token',
      method: 'POST',
      data: { token },
    },
    {
      isPublic: true,
    }
  );
};
