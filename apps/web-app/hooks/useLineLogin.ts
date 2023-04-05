import {
  getLineUserProfile,
  revokeLineOauthToken,
} from './../requests/oauth/line';
import { useRouter } from 'next/router';
import { v4 as uuid } from 'uuid';
import OauthConfig from '@/interfaces/OauthConfig';
import LineUserProfile from '@/interfaces/LineUserProfile';
import {
  getLineOauthToken,
  validLineOauthToken,
  refreshLineOauthToken,
} from '@/requests/oauth/line';
import useRequest from './useRequest';

const authorizeUri = 'https://access.line.me/oauth2/v2.1/authorize';
const redirectUriPath = '/auth/line';
const scope = 'profile%20openid%20email';

const useLineLogin = (config: OauthConfig) => {
  const { push } = useRouter();
  const { fetch } = useRequest();

  const getCode = (): void => {
    const queryStrings: { key: string; value: string }[] = [
      { key: 'response_type', value: 'code' },
      { key: 'client_id', value: config.clientId },
      {
        key: 'redirect_uri',
        value: `${window.location.origin}${redirectUriPath}`,
      },
      { key: 'state', value: uuid() },
      { key: 'scope', value: scope },
    ];
    const url = `${authorizeUri}?${queryStrings
      .map((e) => `${e.key}=${e.value}`)
      .join('&')}`;

    push(url);
  };

  const getToken = (code: string) => {
    return fetch(
      getLineOauthToken({
        grant_type: 'authorization_code',
        code,
        redirect_uri: `${window.location.origin}${redirectUriPath}`,
        client_id: config.clientId,
        client_secret: config.clientSecret,
      })
    );
  };

  const validToken = (accessToken: string) => {
    return fetch(validLineOauthToken(accessToken));
  };

  const refreshToken = (refreshToken: string) => {
    return fetch(
      refreshLineOauthToken({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        client_id: config.clientId,
        client_secret: config.clientSecret,
      })
    );
  };

  const revokeToken = (accessToken: string) => {
    return fetch(
      revokeLineOauthToken({
        access_token: accessToken,
        client_id: config.clientId,
        client_secret: config.clientSecret,
      })
    );
  };

  const getUserProfile = (accessToken: string): Promise<LineUserProfile> => {
    return fetch(getLineUserProfile(accessToken));
  };

  return {
    getCode,
    getToken,
    validToken,
    refreshToken,
    revokeToken,
    getUserProfile,
  };
};

export default useLineLogin;
