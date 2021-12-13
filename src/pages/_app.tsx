import * as React from 'react';

import { AppProps } from 'next/app';
import Head from 'next/head';

import { CacheProvider, EmotionCache } from '@emotion/react';
import { Container } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';

import Navbar from 'components/Navbar';

import createEmotionCache from 'utils/createEmotionCache';

import theme from 'styles/theme';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>CodePay</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Navbar />
        <Container style={{ paddingTop: theme.spacing(2) }}>
          <Component {...pageProps} />
        </Container>
      </ThemeProvider>
    </CacheProvider>
  );
}
