import React, { useEffect } from 'react';
import type { AppProps } from 'next/app';
import Router from 'next/router';
import NProgress from 'nprogress';
import SimpleReactLightbox from 'simple-react-lightbox';
import { ThemeProvider } from 'styled-components';
import '../styles/reset.css';
import '../styles/globals.css';
import {
  AuthProvider,
  CreateAssetProvider,
  ModalProvider,
  VolumeProvider,
  WhitelistProvider,
} from '../components/Provider';
import '../styles/customprogress.css';
import * as gtag from '../utils/gtag';
import { dark, light } from '../components/DarkModeToggle/theme';
import { DarkModeToggle } from '../components/DarkModeToggle';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTheme } from '../hooks';
import Head from 'next/head';

NProgress.configure({
  minimum: 0.3,
  easing: 'ease',
  speed: 800,
  showSpinner: false,
});


function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const start = () => NProgress.start();
  const [themeMode, toggleTheme]:any = useTheme(); 
  const theme = themeMode === 'light' ? light : dark;

  const end = (url) => {
    NProgress.done();
    gtag.pageview(url);
  };

  useEffect(() => {
    Router.events.on('routeChangeStart', start);
    Router.events.on('routeChangeComplete', end);
    Router.events.on('routeChangeError', end);
    return () => {
      Router.events.off('routeChangeStart', start);
      Router.events.off('routeChangeComplete', end);
      Router.events.off('routeChangeError', end);
    };
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', themeMode);
  }, [themeMode]);
  return (
    <ThemeProvider theme={theme} >
      <SimpleReactLightbox>
        <ModalProvider>
          <AuthProvider>
            <CreateAssetProvider>
              <WhitelistProvider>
                <VolumeProvider>
                  <DarkModeToggle theme={themeMode} toggleTheme={toggleTheme} />
                  <Head>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                  </Head>
                  <Component {...pageProps} />
                  <ToastContainer
                    position="bottom-right"
                    autoClose={4000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    draggable={false}
                    closeOnClick
                    pauseOnHover
                  />
                </VolumeProvider>              
              </WhitelistProvider>
            </CreateAssetProvider>
          </AuthProvider>
        </ModalProvider>
      </SimpleReactLightbox>
    </ThemeProvider>
  );
}

export default MyApp;
