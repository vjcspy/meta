'use client';

import ThemeConfig from '@src/components/Layouts/ThemeConfig';
import storeManager from '@src/store';
import { withReduxAdapter } from '@stock/packages-redux/src/redux-adapter';
import { withAdapter } from '@web/base/dist/lib/adapter/withAdapters';
import type { PropsWithChildren } from 'react';

function App({ children }: PropsWithChildren) {
  return <ThemeConfig>{children}</ThemeConfig>;
}

export default withAdapter(
  App,
  {
    store: storeManager.getStore(),
  },
  [withReduxAdapter],
);
