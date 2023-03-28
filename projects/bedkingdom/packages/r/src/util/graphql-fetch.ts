import { graphqlRequest } from '@main/packages-web-apollo/dist/util/graphql-request';
import { R_DEFAULT_VALUE } from '@values/R_DEFAULT_VALUE';
import { Registry } from 'chitility';
import { RuntimeError } from 'chitility/dist/lib/error/RuntimeError';

export const graphqlFetch = (
  opts: { query: string; variables?: any },
  headers: any = {}
): Promise<any> => {
  const endpoint = Registry.getInstance().registry(
    R_DEFAULT_VALUE.GRAPHQL_DEFAULT_URL_KEY
  );
  if (typeof endpoint !== 'string') {
    throw new RuntimeError('Please define PROXY_DEFAULT_END_POINT in registry');
  }

  const defaultHeaders = Registry.getInstance().registry(
    R_DEFAULT_VALUE.GRAPHQL_DEFAULT_HEADER_KEY
  );

  return graphqlRequest(
    opts,
    Object.assign(headers, defaultHeaders ?? {}),
    endpoint
  );
};
