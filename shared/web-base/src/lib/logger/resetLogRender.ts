import { Registry } from 'chitility/dist/util/registry';

import { LOG_CONTEXT_KEY } from '../../values/LogKey';

export const resetLogRender = () => {
  Registry.getInstance().unregister(LOG_CONTEXT_KEY);
};
