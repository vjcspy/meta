import { useProductDetailByUrlKeyQuery } from '@vjcspy/apollo';

export const useProductDetailQueryHook: any = (options: any) => {
  return useProductDetailByUrlKeyQuery(options);
};
