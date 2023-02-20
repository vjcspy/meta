import { RetryLink } from '@apollo/client/link/retry';

export const RetryLinkWithDefaultBehavior = () => {
  return new RetryLink({
    delay: {
      initial: 200,
      max: Infinity,
      jitter: true,
    },
    attempts: {
      max: 1,
      retryIf: (error) => error,
      // only work on web
      // error && (typeof navigator === 'undefined' || navigator.onLine),
    },
  });
};
