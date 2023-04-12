import { requestWrapper } from '../request';

export const getLINEOAuthEndpoint = () => {
  return requestWrapper<string>(
    {
      url: '/api/internal/auth/line',
      method: 'GET',
    },
    {
      isPublic: true,
    }
  );
};
