import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useAuth from '@/hooks/useAuth';
import { SignInType } from '@model';

export const Line = () => {
  const { signIn } = useAuth();
  const {
    query: { code, state },
    push,
  } = useRouter();

  useEffect(() => {
    (async function () {
      if (code && state) {
        await signIn({
          code: code as string,
          state: state as string,
          signInType: SignInType.LINE,
        });
        push('/');
      }
    })();
  }, [code, state]);

  return <></>;
};

export default Line;
