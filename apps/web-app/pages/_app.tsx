import AntDesignProvider from '@/components/provider/AntDesignProvider';
import { AppProps } from 'next/app';
import Head from 'next/head';

import './reset.css';
import './tailwind.css';

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
