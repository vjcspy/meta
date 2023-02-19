export const isSSR = (): boolean => {
  // @ts-ignore
  return typeof window === 'undefined';
};
