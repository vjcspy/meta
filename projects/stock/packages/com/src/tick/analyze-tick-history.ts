import { filter, reduce, round, size, sortBy } from 'lodash-es';

import type { IntraDayTickInfo } from '../type/tick';

export const analyzeTickHistory = (
  current: IntraDayTickInfo[],
  history: IntraDayTickInfo[],
  sellAlertRate: number,
  buyAlertRate: number,
) => {
  const count = size(history);
  const hisSumInfo = reduce(
    history,
    (prev, curr) => {
      return {
        shark_buy: round(prev.shark_buy + curr.shark_buy / count),
        shark_sell: round(prev.shark_sell + curr.shark_sell / count),
        sheep_buy: round(prev.sheep_buy + curr.sheep_buy / count),
        sheep_sell: round(prev.sheep_sell + curr.sheep_sell / count),
      };
    },
    {
      shark_buy: 0,
      shark_sell: 0,
      sheep_buy: 0,
      sheep_sell: 0,
    },
  );

  const alerts = {
    sheep_sell: sortBy(
      filter(
        current,
        (d) => d.sheep_sell > hisSumInfo.sheep_sell * sellAlertRate,
      ),
      'ts',
    ),
    sheep_buy: sortBy(
      filter(current, (d) => d.sheep_buy > hisSumInfo.sheep_buy * buyAlertRate),
      'ts',
    ),
    shark_sell: sortBy(
      filter(
        current,
        (d) => d.shark_sell > hisSumInfo.shark_sell * sellAlertRate,
      ),
      'ts',
    ),
    shark_buy: sortBy(
      filter(current, (d) => d.shark_buy > hisSumInfo.shark_buy * buyAlertRate),
      'ts',
    ),
  };

  return {
    alerts,
  };
};
