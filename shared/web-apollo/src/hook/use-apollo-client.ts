import { ApolloClient } from '@apollo/client';
import { useEffect, useState } from 'react';
import { InitApolloClientOptions } from '../types/driver';

/**
 *
 * @returns {[ApolloClient<any> & {persistor: any}, boolean]}
 * @param initApolloClient
 * @param options
 */
export const useApolloClient = (
  initApolloClient,
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

  useEffect(() => {
    if ((client as any)?.persistor) {
      const persistor = (client as any)?.persistor;
      async function initialize() {
        await persistor.restore();
        setInitPersistent(true);
      }
      initialize();
    }
  }, []);

  return { client, initPersistent };
};
