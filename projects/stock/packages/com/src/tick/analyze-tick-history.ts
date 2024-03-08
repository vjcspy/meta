import { filter, sortBy } from 'lodash-es';

import type { IntraDayTickInfo } from '../type/tick';

export const analyzeTickHistory = (
  current: IntraDayTickInfo[],
  deal_value_5: number,
  sellAlertRate: number,
  buyAlertRate: number,
) => {
  const alerts = {
    sheep_sell: sortBy(
      filter(
        current,
        (d) => d.sheep_sell >= (deal_value_5 * sellAlertRate) / 100,
      ),
      'ts',
    ),
    sheep_buy: sortBy(
      filter(
        current,
        (d) => d.sheep_buy >= (deal_value_5 * buyAlertRate) / 100,
      ),
      'ts',
    ),
    shark_sell: sortBy(
      filter(
        current,
        (d) => d.shark_sell >= (deal_value_5 * sellAlertRate) / 100,
      ),
      'ts',
    ),
    shark_buy: sortBy(
      filter(
        current,
        (d) => d.shark_buy >= (deal_value_5 * buyAlertRate) / 100,
      ),
      'ts',
    ),
  };

  return {
    alerts,
  };
};
