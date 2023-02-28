import { withApollo } from '@web/apollo';

import { withDomain } from '../modules/domain/drivers/domain';
import { withStore } from '../modules/store/drivers/store';

export const ADAPTERS = [withDomain, withStore, withApollo];
