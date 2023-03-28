import type { Cart, Order } from '@vjcspy/apollo';
import { Registry } from 'chitility';
import filter from 'lodash/filter';
import sortBy from 'lodash/sortBy';

import { CheckoutConstant } from '../constant';

export type CheckoutHookFn = (cart: Cart, order?: Order) => Promise<boolean>;
export interface CheckoutHookCfg {
  name: string;
  hookFn: CheckoutHookFn;
  priority: number;
  type: string;
}

export const addPlaceOrderHookFn = (
  name: string,
  hookFn: CheckoutHookFn,
  priority: number,
  type = 'after'
) => {
  let hookFns: CheckoutHookCfg[] =
    Registry.getInstance().registry(CheckoutConstant.CHECKOUT_HOOK_KEY) ?? [];
  hookFns = filter(hookFns, (fn) => fn.name !== name);
  hookFns.push({
    name,
    hookFn,
    priority,
    type,
  });

  hookFns = sortBy(hookFns, 'priority');
  Registry.getInstance().register(CheckoutConstant.CHECKOUT_HOOK_KEY, hookFns);
};
