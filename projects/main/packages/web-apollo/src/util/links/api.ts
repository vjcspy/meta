import { HttpLinkPersisted } from './httpLinkPersisted';

export const ApiLink = (uri: string) => {
  return new HttpLinkPersisted({
    uri,
    credentials: 'omit', // 'same-origin'
    fetch,
  });
};
