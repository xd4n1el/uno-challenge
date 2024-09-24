import { PropsWithChildren, ReactElement } from 'react';

import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import ApolloClientProvider from './apollo.provider';

export const Providers = ({
  children,
}: Readonly<PropsWithChildren>): ReactElement => {
  return (
    <ApolloClientProvider>
      <AppRouterCacheProvider>{children}</AppRouterCacheProvider>
    </ApolloClientProvider>
  );
};
