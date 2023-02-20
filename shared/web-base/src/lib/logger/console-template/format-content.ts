import { color } from 'console-log-colors';
export const formatContent = (context: string) => {
  return color.yellow(`[${context}]`);
};
