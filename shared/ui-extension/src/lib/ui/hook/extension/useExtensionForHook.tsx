import { useMemo } from 'react';

export const useExtensionForHook = (hookId: string, props: any) => {
  return useMemo(() => {
    return props &&
      props.extensionData &&
      props.extensionData.hookCpt &&
      props.extensionData.hookCpt[hookId]
      ? props.extensionData.hookCpt[hookId]
      : null;
  }, []);
};
