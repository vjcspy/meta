import { graphQLFetchWithAdditionHeaders } from '@util/grapqh-fetch-with-addition-headers';

export const graphqlFetchForCustomer = (opts: {
  query: string;
  variables?: any;
}) => {
  return graphQLFetchWithAdditionHeaders(opts, ['Authorization', 'Store']);
};
