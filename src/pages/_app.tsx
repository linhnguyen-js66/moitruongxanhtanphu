// eslint-disable-next-line simple-import-sort/imports
import '@/styles/global.scss';
import { ConfigProvider } from 'antd';
import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import { I18nextProvider } from 'react-i18next';
import { PersistGate } from 'redux-persist/integration/react';

import LoadingAnimation from '@/assets/json/loading.json';
import { DialogView, TextBase } from '@/components';
import { LoadingProgress } from '@/components/loading';
import { ToastView } from '@/components/toast';
import EmptyLayout from '@/layouts/empty-layout';
import i18n from '@/utils/i18n/i18n';
import type { NextPage } from 'next/types';
import { wrapperStore } from '../stores/store';

import Lottie from 'lottie-react';
import { useEffect, useState } from 'react';

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  Layout?: (props: LayoutProps) => React.ReactElement;
};

export type LayoutProps = {
  children: React.ReactNode;
};

const MyApp = ({ Component, ...rest }: AppPropsWithLayout) => {
  const { store, props } = wrapperStore.useWrappedStore(rest);
  const Layout = Component.Layout ?? EmptyLayout;
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setIsLoading(false), 5000);
  }, []);

  return (
    <PersistGate persistor={store.__persistor}>
      <I18nextProvider i18n={i18n}>
        <ThemeProvider defaultTheme="light">
          <ConfigProvider
            theme={{
              components: {
                Input: {
                  controlHeight: 38.75,
                  algorithm: true,
                },
              },
            }}
          >
            {isLoading && (
              <div
                className="absolute z-[88] flex size-full flex-col items-center justify-center"
                style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
              >
                <Lottie animationData={LoadingAnimation} loop style={{ height: 300, width: 300 }} />
                <TextBase
                  t18n="text:loading"
                  preset="body-text-32-semibold"
                  className="text-color-50"
                />
              </div>
            )}
            <Layout>
              <ToastView />

              <Component {...props.pageProps} loading={isLoading} />
              <DialogView />
              <LoadingProgress />
            </Layout>
          </ConfigProvider>
        </ThemeProvider>
      </I18nextProvider>
    </PersistGate>
  );
};

export default wrapperStore.withRedux(MyApp);
