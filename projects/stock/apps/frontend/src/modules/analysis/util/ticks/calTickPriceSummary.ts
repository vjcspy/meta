import type { TickPriceRecord } from '@modules/analysis/types';
import { TickAction } from '@stock/packages-com';
import { forEach } from 'lodash-es';

export const calTickPriceSummary = (data: TickPriceRecord[]) => {
  let totalBuy = 0;
  let totalSell = 0;
  let totalSheepSell = 0;
  let totalSheepBuy = 0;
  let totalSharkSell = 0;
  let totalSharkBuy = 0;

  forEach(data, (t) => {
    switch (t.a) {
      case TickAction.BUY_AT:
        break;

      case TickAction.SELL_AT:
        break;

      case TickAction.SELL_SHEEP:
        totalSell += t.vol;
        totalSheepSell += t.vol;
        break;
      case TickAction.BUY_SHEEP:
        totalBuy += t.vol;
        totalSheepBuy += t.vol;
        break;

      case TickAction.SELL_SHARK:
        totalSell += t.vol;
        totalSharkSell += t.vol;
        break;

      case TickAction.BUY_SHARK:
        totalBuy += t.vol;
        totalSharkBuy += t.vol;
        break;
    }
  });

  return {
    totalBuy,
    totalSell,
    totalSharkSell,
    totalSharkBuy,
    totalSheepSell,
    totalSheepBuy,
  };
};
