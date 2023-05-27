import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import { AppProps } from 'next/app';
import type { AxiosRequestConfig } from 'axios';
import type { LayoutType } from '@kuda-terbang/ui-mui-react-example';

declare global {
  interface Window {
    dataLayer: Record<string, any>[];
  }

  type NextPageWithLayout = NextPage & {
    layoutType?: LayoutType;
  };

  type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
  };

  type SetState<T> = React.Dispatch<React.SetStateAction<T>>;
}
