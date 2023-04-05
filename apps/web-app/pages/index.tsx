import { Button } from 'antd';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';

import SummarySwiper from '@/containers/summary/SummarySwiper';
import useLineLogin from '@/hooks/useLineLogin';
import OauthConfig from '@/interfaces/OauthConfig';
import getEnv from '@/utils/env';

type Props = {
  lineOauthConfig: OauthConfig;
};

const Index: NextPage<Props> = ({ lineOauthConfig }) => {
  const { getCode } = useLineLogin(lineOauthConfig);

  return (
    <>
      <SummarySwiper />
      <Button onClick={getCode}>LINE Login</Button>
    </>
  );
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

export default Index;
