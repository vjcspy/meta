import type { ApolloClient } from '@apollo/client';
import { useCallback, useEffect, useState } from 'react';

import type { InitApolloClientOptions } from '../types/driver';

/**
 *
 * @returns {[ApolloClient<any> & {persistor: any}, boolean]}
 * @param initApolloClient
 * @param options
 */
export const useApolloClient = (
  initApolloClient: any,
  options: InitApolloClientOptions & { client: any }
) => {
  /*
   * Nếu trước đó đã init ở SSR thì tái sử dụng
   * */
  let client: ApolloClient<any> = options?.client;
  // @ts-ignore
  if (!client) {
    client = initApolloClient(options);
  }
  const [initPersistent, setInitPersistent] = useState(
    !(client as any)?.persistor
  );

  const initializePersistent = useCallback(async () => {
    if ((client as any)?.persistor) {
      const persistor = (client as any)?.persistor;
      await persistor.restore();
      setInitPersistent(true);
    }
  }, []);

  useEffect(() => {
    initializePersistent();
  }, []);

  return { client, initPersistent };
};
