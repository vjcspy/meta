import { GraphQLClient } from 'graphql-request';

export const graphqlRequest = (
  opts: { query: string; variables?: any },
  headers: any = {},
  apiBase: string
): Promise<any> => {
  const client = new GraphQLClient(apiBase);

  client.setHeaders({ ...headers });

  return client.request(opts.query, opts.variables);
};
