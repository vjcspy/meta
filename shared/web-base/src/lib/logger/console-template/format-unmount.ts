import { Registry } from 'chitility/dist/util/registry';
import { color } from 'console-log-colors';

import { LOG_CONTEXT_KEY } from '../../../values/LogKey';
import { formatContext } from './format-content';

export const formatUnmount = (context: string) => {
  const unmountMessage = `${color.red.italic('Unmount')} ${formatContext(
    context
  )}`;
  const unmountCb = () => {
    if (Registry.getInstance().registry(LOG_CONTEXT_KEY)) {
      delete Registry.getInstance().registry(LOG_CONTEXT_KEY)[context];
    }
  };
  return { unmountMessage, unmountCb };
};
