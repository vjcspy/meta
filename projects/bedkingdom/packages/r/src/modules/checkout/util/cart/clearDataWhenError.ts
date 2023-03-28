import { AccountPersistent } from '@modules/account/util/account-persistent';
import { AccountConstant } from '@modules/account/util/constant';
import { CheckoutPersistent } from '@modules/checkout/util/checkout-persistent';
import { CheckoutConstant } from '@modules/checkout/util/constant';

export const clearDataWhenError = async () => {
  let currentErrorCount: any =
    parseInt(
      (await CheckoutPersistent.getItem(
        CheckoutConstant.GET_CART_DETAIL_ERROR_COUNT
      )) ?? '0'
    ) ?? 0;

  if (currentErrorCount > 1) {
    // window.location.reload();
    await CheckoutPersistent.removeItem(CheckoutConstant.GUEST_CART_ID_KEY);
    await AccountPersistent.removeItem(AccountConstant.TOKEN_KEY);
  } else {
    await CheckoutPersistent.saveItem(
      CheckoutConstant.GET_CART_DETAIL_ERROR_COUNT,
      ++currentErrorCount
    );
  }
};
