import { AppProps } from 'next/app';
import Head from 'next/head';

import AntDesignProvider from '@/components/provider/AntDesignProvider';

import './reset.css';
import './tailwind.css';
import '@/utils/prototype';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Keep Sport</title>
      </Head>
      <main className="app">
        <AntDesignProvider>
          <Component {...pageProps} />
        </AntDesignProvider>
      </main>
    </>
  );
}

export default CustomApp;
