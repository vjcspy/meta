import { Registry } from 'chitility/dist/util/registry';
import { color } from 'console-log-colors';

import { LOG_CONTEXT_KEY } from '../../../values/LogKey';
import { logContext } from './logContext';

export const logUnmount = (context: string) => {
  const unmountMessage = `${color.red.italic('Unmount')} ${logContext(
    context
  )}`;
  const unmountCb = () => {
    if (Registry.getInstance().registry(LOG_CONTEXT_KEY)) {
      delete Registry.getInstance().registry(LOG_CONTEXT_KEY)[context];
    }
  };
  return { unmountMessage, unmountCb };
};
