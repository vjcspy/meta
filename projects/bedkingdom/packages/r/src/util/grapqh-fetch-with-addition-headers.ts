import { R_DEFAULT_VALUE } from '@values/R_DEFAULT_VALUE';
import { Registry } from 'chitility';
import forEach from 'lodash/forEach';

import { graphqlFetch } from './graphql-fetch';

export const graphQLFetchWithAdditionHeaders = async (
  opts: { query: string; variables?: any },
  additional: string[],
  headers: any = {}
): Promise<any> => {
  const additionalHeaderResolved = Registry.getInstance().registry(
    R_DEFAULT_VALUE.GRAPHQL_RESOLVE_ADDITIONAL_HEADER_KEY
  );

  const customHeader: any = {};
  const asyncFuncs: any[] = [];
  if (typeof additionalHeaderResolved === 'object') {
    forEach(additional, (key: string) => {
      if (
        additionalHeaderResolved.hasOwnProperty(key) &&
        typeof additionalHeaderResolved[key] === 'function'
      ) {
        asyncFuncs.push(
          // eslint-disable-next-line no-async-promise-executor
          new Promise(async (resolve: any) => {
            const v = await additionalHeaderResolved[key]();
            if (typeof v === 'string') {
              return resolve({
                key,
                value: v,
              });
            }

            return resolve(undefined);
          })
        );
      }
    });
  }
  const data = await Promise.all(asyncFuncs);

  forEach(data, (additionHeaderData: any) => {
    if (additionHeaderData) {
      if (additionHeaderData['key'] && additionHeaderData['value']) {
        const { key, value } = additionHeaderData;
        customHeader[key] = value;
      }
    }
  });

  return graphqlFetch(opts, Object.assign({}, headers, customHeader));
};
