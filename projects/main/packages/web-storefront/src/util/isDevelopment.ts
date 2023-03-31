import * as process from 'process';

export const isDevelopment = () => {
  return process.env.NEXT_PUBLIC_ENVIRONMENT === 'development';
};
