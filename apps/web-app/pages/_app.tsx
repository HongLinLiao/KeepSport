import { ReactElement, ReactNode } from 'react';
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import Head from 'next/head';

import './reset.css';
import './tailwind.css';
import '@/utils/prototype';
import AxiosProvider from '@/components/provider/AxiosProvider';
import AntDesignProvider from '@/components/provider/AntDesignProvider';
import AppLayout from '@/containers/layout/AppLayout';
import GeneralProvider from '@/components/provider/GeneralProvider';
import AuthProvider from '@/components/provider/AuthProvider';
import Startup from '@/containers/util/Startup';

export type NextPageWithProps<P = unknown, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppWithProps = AppProps & {
  Component: NextPageWithProps;
};

function CustomApp({ Component, pageProps }: AppWithProps) {
  const getLayout =
    Component.getLayout ??
    ((page: ReactElement) => <AppLayout>{page}</AppLayout>);

  return (
    <>
      <Head>
        <title>Keep Sport</title>
      </Head>
      <main className="app">
        <AxiosProvider>
          <AntDesignProvider>
            <AuthProvider>
              <GeneralProvider>
                <Startup>{getLayout(<Component {...pageProps} />)}</Startup>
              </GeneralProvider>
            </AuthProvider>
          </AntDesignProvider>
        </AxiosProvider>
      </main>
    </>
  );
}

export default CustomApp;
