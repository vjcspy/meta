import { Registry } from 'chitility/dist/util/registry';
import { color } from 'console-log-colors';

import { LOG_CONTEXT_KEY } from '../../../values/LogKey';
import { formatContext } from './format-content';

export const formatRender = (context: string) => {
  if (typeof Registry.getInstance().registry(LOG_CONTEXT_KEY) === 'undefined') {
    Registry.getInstance().register(LOG_CONTEXT_KEY, {
      [context]: 1,
    });
  } else {
    const _r = Registry.getInstance().registry(LOG_CONTEXT_KEY);
    if (typeof _r[context] === 'undefined') {
      _r[context] = 1;
    } else {
      ++_r[context];
    }
  }
  return `${color.cyan.italic('Render')} ${formatContext(context)} +${
    Registry.getInstance().registry(LOG_CONTEXT_KEY)[context]
  }`;
};
