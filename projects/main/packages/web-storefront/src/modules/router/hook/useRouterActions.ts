import { useCallback } from 'react';

export const useRouterActions = () => {
  const go = useCallback((path: any) => {
    alert(`function not yet implemented: go ${path}`);
  }, []);

  return { go };
};
