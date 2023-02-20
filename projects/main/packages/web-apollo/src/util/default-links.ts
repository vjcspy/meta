import { ApiLink } from './links/api';
import { AuthLink } from './links/auth';
import { ErrorLink } from './links/error';
import { RetryLinkWithDefaultBehavior } from './links/retry';
import { StoreLink } from './links/store';
import { ApolloLink } from '@apollo/client';

export const DefaultLink = (
  api: string,
  getStoreCode: () => Promise<string>,
  getToken: () => Promise<string>
): ApolloLink => {
  // TODO: should split ApiLink with 2 case Batched and non-Batched

  return ApolloLink.from([
    RetryLinkWithDefaultBehavior(),
    StoreLink(getStoreCode),
    AuthLink(getToken),
    ErrorLink,
    ApiLink(api),
  ]);
};
