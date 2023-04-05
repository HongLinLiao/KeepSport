import { GetServerSideProps, GetServerSidePropsContext } from 'next';

import { NextPageWithProps } from './_app';
import SummarySwiper from '@/containers/summary/SummarySwiper';
import OauthConfig from '@/interfaces/OauthConfig';
import getEnv from '@/utils/env';

type Props = {
  lineOauthConfig: OauthConfig;
};

const Index: NextPageWithProps<Props> = ({ lineOauthConfig }) => {
  return (
    <>
      <SummarySwiper />
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
