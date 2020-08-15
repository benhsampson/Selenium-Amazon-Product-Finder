import * as React from 'react';
import type {AppProps} from 'next/app';

import withAuth from '../lib/utils/useAuth';

function MyApp({Component, pageProps}: AppProps) {
  return <Component {...pageProps} />;
}

export default withAuth(MyApp);
