import { setContext } from '@apollo/client/link/context';

export const AuthLink = (getToken: () => Promise<string>) =>
  setContext(async (_, { headers }) => {
    // get the authentication token from local storage if it exists.
    const token = await getToken();

    // return the headers to the context so httpLink can read them
    const origHeaders = {
      headers: {
        ...headers,
      },
    };

    if (token) {
      origHeaders.headers['Authorization'] = `Bearer ${token}`;
    }

    return origHeaders;
  });
