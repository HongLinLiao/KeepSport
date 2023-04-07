import { useRouter } from 'next/router';
import { useEffect } from 'react';

import useLineLogin from '@/hooks/useLineLogin';

export const Line = () => {
  const { login } = useLineLogin();
  const {
    isReady,
    query: { code, state },
  } = useRouter();

  useEffect(() => {
    (async function () {
      if (code && state) {
        await login(code as string, state as string);
      }
    })();
  }, [isReady, code, state, login]);

  return <></>;
};

export default Line;
