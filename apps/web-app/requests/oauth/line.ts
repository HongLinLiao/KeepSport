import { GetLINEOAuthTokenBody, GetLINEOAuthTokenResponse } from '@model';
import { requestWrapper } from '../request';

export const getLINEOAuthEndpoint = () => {
  return requestWrapper<string>({
    url: '/api/internal/auth/line',
    method: 'GET',
  });
};

export const lineLogin = (body: GetLINEOAuthTokenBody) => {
  return requestWrapper<GetLINEOAuthTokenResponse>({
    url: '/api/internal/auth/line',
    method: 'POST',
    data: body,
  });
};
