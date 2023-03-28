import { AccountPersistent } from '@modules/account/util/account-persistent';
import { AccountConstant } from '@modules/account/util/constant';
import { R_DEFAULT_VALUE } from '@values/R_DEFAULT_VALUE';
import { Registry } from 'chitility';

export const configGraphQlWithAuthenticate = () => {
  const additionalHeaderResolved = Registry.getInstance().registry(
    R_DEFAULT_VALUE.GRAPHQL_RESOLVE_ADDITIONAL_HEADER_KEY
  );

  const resolveAuth = async () => {
    const token = await AccountPersistent.getItem(AccountConstant.TOKEN_KEY);
    if (token) {
      return `Bearer ${token}`;
    } else {
      return undefined;
    }
  };

  const withAuthenticateHeader = Object.assign(
    {},
    { ...additionalHeaderResolved },
    {
      Authorization: resolveAuth,
    }
  );

  Registry.getInstance().register(
    R_DEFAULT_VALUE.GRAPHQL_RESOLVE_ADDITIONAL_HEADER_KEY,
    withAuthenticateHeader
  );
};
