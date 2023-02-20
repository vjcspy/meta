import { color } from 'console-log-colors';
export const formatImportant = (content: string) => {
  return color.blue.italic(`>>> ${content}`);
};
