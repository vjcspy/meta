import { setContext } from '@apollo/client/link/context';

export const StoreLink = (getStoreCode: () => Promise<string>) =>
  setContext(async (_, { headers }) => {
    // get the authentication token from local storage if it exists.
    const storeCode = await getStoreCode();
    const originHeaders = {
      headers: {
        ...headers,
      },
    };
    if (!!storeCode) {
      originHeaders.headers['Store'] = storeCode;
    }

    // TODO: [KP-164] work with ssr mode

    return originHeaders;
  });
