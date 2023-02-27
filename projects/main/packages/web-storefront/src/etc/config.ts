import { withApollo } from '@web/apollo';

import { withDomain } from '../modules/domain/drivers/domain';

export const ADAPTERS = [withDomain, withApollo];
