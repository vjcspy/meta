import REGISTRY from '@values/extendable/REGISTRY';

export const fetchGraphql = (
  query: string,
  variables: any,
  operationName: string
) => {
  const url = new URL(REGISTRY.r('GRAPHQL_DEFAULT_URL_KEY'));
  url.searchParams.set('query', query);
  url.searchParams.set('variables', JSON.stringify(variables));
  url.searchParams.set('operationName', operationName);

  const headers = {
    'Content-Type': 'application/json',
  };

  return fetch(url.toString(), {
    method: 'GET',
    credentials: 'omit',
    headers: new Headers(headers),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.errors) {
        throw new Error(
          `urlResolver query failed: ${JSON.stringify(res.errors, null, 2)}`
        );
      }

      return res;
    });
};
