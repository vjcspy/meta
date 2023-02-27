import { color } from 'console-log-colors';

export const formatProcessingSSR = (content: string): string => {
  return color.red.italic(`[SSR Processing] ${content}`);
};
