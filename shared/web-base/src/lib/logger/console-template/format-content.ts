import { color } from 'console-log-colors';
export const formatContext = (context: string) => {
  return color.yellow(`[${context}]`);
};
