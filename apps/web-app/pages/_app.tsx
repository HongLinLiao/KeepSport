import { AppProps } from 'next/app';
import Head from 'next/head';

import './reset.css';
import './tailwind.css';
import '@/utils/prototype';
import AxiosProvider from '@/components/provider/AxiosProvider';
import AntDesignProvider from '@/components/provider/AntDesignProvider';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Keep Sport</title>
      </Head>
      <main className="app">
        <AxiosProvider>
          <AntDesignProvider>
            <Component {...pageProps} />
          </AntDesignProvider>
        </AxiosProvider>
      </main>
    </>
  );
}

export default CustomApp;
