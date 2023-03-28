import { configGraphQlWithAuthenticate } from '@modules/account/util/configGrahphQlWithAuthenticate';
import { configGraphQLWithStore } from '@modules/store/util/configGraphQLWithStore';

export function boostrapR() {
  configGraphQlWithAuthenticate();
  configGraphQLWithStore();
}
