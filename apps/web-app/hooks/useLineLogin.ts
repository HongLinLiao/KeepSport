import { useCallback } from 'react';
import { useRouter } from 'next/router';
import { getLINEOAuthEndpoint } from '@/requests/auth/line';
import useRequest from './useRequest';

const useLineLogin = () => {
  const { push } = useRouter();
  const { fetch } = useRequest();

  const redirectToOAuth = useCallback(async () => {
    const url = await fetch(getLINEOAuthEndpoint());
    push(url);
  }, [fetch, push]);

  return {
    redirectToOAuth,
  };
};

export default useLineLogin;
