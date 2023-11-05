'use client';

import ThemeConfig from '@src/components/Layouts/ThemeConfig';
import store from '@src/store';
import { Provider } from '@stock/packages-redux';
import type { PropsWithChildren } from 'react';

function App({ children }: PropsWithChildren) {
  return (
    <Provider store={store}>
      <ThemeConfig>{children}</ThemeConfig>
    </Provider>
  );
}

export default App;
