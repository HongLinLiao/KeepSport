import { useCallback } from 'react';
import { useRouter } from 'next/router';
import { getLINEOAuthEndpoint, lineLogin } from '@/requests/oauth/line';
import useRequest from './useRequest';

const useLineLogin = () => {
  const { push } = useRouter();
  const { fetch } = useRequest();

  const redirectToOAuth = useCallback(async () => {
    const url = await fetch(getLINEOAuthEndpoint());
    push(url);
  }, [fetch, push]);

  const login = useCallback(
    (code: string, state: string) => {
      return fetch(
        lineLogin({
          code,
          state,
        })
      );
    },
    [fetch]
  );

  return {
    redirectToOAuth,
    login,
  };
};

export default useLineLogin;
