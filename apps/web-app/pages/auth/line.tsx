import { useRouter } from 'next/router';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import { useEffect } from 'react';

import useLineLogin from '@/hooks/useLineLogin';
import getEnv from '@/utils/env';
import OauthConfig from '@/interfaces/OauthConfig';

type Props = {
  lineOauthConfig: OauthConfig;
};

export const Line: NextPage<Props> = ({ lineOauthConfig }) => {
  const { getToken, getUserProfile, revokeToken } =
    useLineLogin(lineOauthConfig);
  const {
    push,
    query: { code },
  } = useRouter();

  useEffect(() => {
    (async function () {
      if (code) {
        const oauthData = await getToken(code as string);
        const userProfile = await getUserProfile(oauthData.access_token);
        alert(JSON.stringify(userProfile));
        await revokeToken(oauthData.access_token);
        push('/');
      }
    })();
  }, [code, getToken, push, getUserProfile, revokeToken]);

  return <></>;
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const env = getEnv();
  return {
    props: {
      lineOauthConfig: {
        clientId: env.LINE_OAUTH_CLIENT_ID,
        clientSecret: env.LINE_OAUTH_CLIENT_SECRET,
      },
    },
  };
};

export default Line;
