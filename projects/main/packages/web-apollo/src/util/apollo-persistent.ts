import { InMemoryCache } from '@apollo/client';

import result from '../graphql/generated/_generated-fragment-types';
import { cacheKeyFromType } from './apolloCache';

export const preInstantiatedCacheFactory = () =>
  new InMemoryCache({
    dataIdFromObject: cacheKeyFromType,
    possibleTypes: result.possibleTypes,
  });
/**
 * To improve initial load time, create an apollo cache object as soon as
 * this module is executed, since it doesn't depend on any component props.
 * The tradeoff is that we may be creating an instance we don't end up needing.
 *
 * @see https://www.npmjs.com/package/apollo-cache-inmemory
 */
export const preInstantiatedCache = preInstantiatedCacheFactory();
