import { color } from 'console-log-colors';
export const logContext = (context: string) => {
  return color.yellow(`[${context}]`);
};
