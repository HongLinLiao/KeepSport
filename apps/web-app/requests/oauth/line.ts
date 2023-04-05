import {} from '@/interfaces/LineUserProfile';
import {
  GetOAuthTokenBody,
  GetOAuthTokenResponse,
  RefreshOAuthTokenBody,
  RevokeOAuthTokenBody,
  ValidOAuthTokenResponse,
  GetUserProfileResponse,
} from '@model';
import { requestWrapper } from '../request';

export const getLineOauthToken = (data: GetOAuthTokenBody) => {
  return requestWrapper<GetOAuthTokenResponse>({
    url: 'https://api.line.me/oauth2/v2.1/token',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data,
  });
};

export const validLineOauthToken = (accessToken: string) => {
  return requestWrapper<ValidOAuthTokenResponse>({
    url: 'https://api.line.me/oauth2/v2.1/verify',
    method: 'GET',
    params: {
      access_token: accessToken,
    },
  });
};

export const refreshLineOauthToken = (data: RefreshOAuthTokenBody) => {
  return requestWrapper<GetOAuthTokenResponse>({
    url: 'https://api.line.me/oauth2/v2.1/token',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data,
  });
};

export const revokeLineOauthToken = (data: RevokeOAuthTokenBody) => {
  return requestWrapper<void>({
    url: 'https://api.line.me/oauth2/v2.1/revoke',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data,
  });
};

export const getLineUserProfile = (accessToken: string) => {
  return requestWrapper<GetUserProfileResponse>({
    url: 'https://api.line.me/v2/profile',
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
