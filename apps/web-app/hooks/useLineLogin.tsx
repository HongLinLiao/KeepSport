import { useRouter } from 'next/router';
import { v4 as uuid } from 'uuid';
import axios from 'axios';
import OauthConfig from '@/interfaces/OauthConfig';
import OauthResponse from '@/interfaces/OauthResponse';
import LineUserProfile from '@/interfaces/LineUserProfile';

interface Endpoint {
  uri: string;
  method: 'get' | 'post';
}
type EndpointType =
  | 'issueToken'
  | 'verifyToken'
  | 'refreshToken'
  | 'revokeToken'
  | 'userProfile';

const authorizeUri = 'https://access.line.me/oauth2/v2.1/authorize';
const endpoints: Record<EndpointType, Endpoint> = {
  issueToken: {
    uri: 'https://api.line.me/oauth2/v2.1/token',
    method: 'post',
  },
  verifyToken: {
    uri: 'https://api.line.me/oauth2/v2.1/verify',
    method: 'get',
  },
  refreshToken: {
    uri: 'https://api.line.me/oauth2/v2.1/token',
    method: 'post',
  },
  revokeToken: {
    uri: 'https://api.line.me/oauth2/v2.1/revoke',
    method: 'post',
  },
  userProfile: {
    uri: 'https://api.line.me/v2/profile',
    method: 'get',
  },
};
const redirectUriPath = '/auth/line';
const scope = 'profile%20openid%20email';

const useLineLogin = (config: OauthConfig) => {
  const { push } = useRouter();

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

  const getToken = (code: string): Promise<OauthResponse> => {
    return axios
      .request({
        url: endpoints.issueToken.uri,
        method: endpoints.issueToken.method,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: {
          grant_type: 'authorization_code',
          code,
          redirect_uri: `${window.location.origin}${redirectUriPath}`,
          client_id: config.clientId,
          client_secret: config.clientSecret,
        },
      })
      .then((res) => res.data);
  };

  const validToken = (accessToken: string) => {
    return axios.request({
      url: endpoints.verifyToken.uri,
      method: endpoints.verifyToken.method,
      params: {
        access_token: accessToken,
      },
    });
  };

  const refreshToken = (refreshToken: string): Promise<OauthResponse> => {
    return axios
      .request({
        url: endpoints.refreshToken.uri,
        method: endpoints.refreshToken.method,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: {
          grant_type: 'refresh_token',
          refresh_token: refreshToken,
          client_id: config.clientId,
          client_secret: config.clientSecret,
        },
      })
      .then((res) => res.data);
  };

  const revokeToken = (accessToken: string) => {
    return axios.request({
      url: endpoints.revokeToken.uri,
      method: endpoints.revokeToken.method,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: {
        access_token: accessToken,
        client_id: config.clientId,
        client_secret: config.clientSecret,
      },
    });
  };

  const getUserProfile = (accessToken: string): Promise<LineUserProfile> => {
    return axios
      .request({
        url: endpoints.userProfile.uri,
        method: endpoints.userProfile.method,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => res.data);
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
