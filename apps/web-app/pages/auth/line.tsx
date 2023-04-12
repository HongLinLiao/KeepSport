import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { NextPageWithProps } from '../_app';

import useAuth from '@/hooks/useAuth';
import useAuthCtx from '@/hooks/context/useAuth';
import { SignInType } from '@model';
import { Space, Spin } from 'antd';

export const Line: NextPageWithProps = () => {
  const { signIn } = useAuth();
  const { setJwtToken } = useAuthCtx();
  const {
    query: { code, state },
    push,
  } = useRouter();

  useEffect(() => {
    (async function () {
      if (code && state) {
        const token = await signIn({
          code: code as string,
          state: state as string,
          signInType: SignInType.LINE,
        });
        setJwtToken(token);
        push('/');
      }
    })();
  }, [code, state]);

  return (
    <Space className="w-full h-screen flex justify-center items-center">
      <Spin size="large" />
    </Space>
  );
};

Line.getLayout = () => <Line />;

export default Line;
