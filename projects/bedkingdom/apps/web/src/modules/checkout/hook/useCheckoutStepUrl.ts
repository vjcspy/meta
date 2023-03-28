import { useUrlPath } from '@main/packages-web-storefront/src/modules/router/hook/useUrlPath';

export const useCheckoutStepUrl = () => {
  const { pathname } = useUrlPath();
  let step = 0;

  if (pathname) {
    if (pathname.indexOf('cart') > -1) {
      step = 1;
    } else if (pathname.indexOf('delivery') > -1) {
      step = 2;
    } else if (pathname.indexOf('payment') > -1) {
      step = 3;
    } else if (pathname.indexOf('complete') > -1) {
      step = 4;
    }
  }

  return {
    step,
  };
};
