import React from 'react';
import Layout from '../components/Layout';
import Head from 'next/head';

import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <link rel="shortcut icon" href="/images/favicon.ico" />
        <title>Adrian Falcusan</title>
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
