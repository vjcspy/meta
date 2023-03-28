import { useSelector } from '@main/packages-web-redux';

export const useCheckoutConfig = () => {
  const checkoutConfig = useSelector((state: any) => state.coreConfig.checkout);

  return { state: { checkoutConfig } };
};
