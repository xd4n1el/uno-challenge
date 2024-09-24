'use client';

import { PropsWithChildren, ReactElement } from 'react';
import { ApolloProvider } from '@apollo/client';
import clientAPI from '@/services/apollo';

const ApolloClientProvider = ({
  children,
}: PropsWithChildren): ReactElement => {
  return <ApolloProvider client={clientAPI}>{children}</ApolloProvider>;
};

export default ApolloClientProvider;
