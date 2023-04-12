import { useRouter } from 'next/router';
import { getLINEOAuthEndpoint } from '@/requests/auth/line';
import useRequest from './useRequest';

const useLineLogin = () => {
  const { push } = useRouter();
  const { fetch } = useRequest();

  const redirectToOAuth = async () => {
    const url = await fetch(getLINEOAuthEndpoint());
    push(url);
  };

  return {
    redirectToOAuth,
  };
};

export default useLineLogin;
