import { forEach, last, round, sortBy } from 'lodash-es';

export interface MarketTickChartDataType {
  date: string;
  bSheep: number;
  bShark: number;
  sSheep: number;
  sShark: number;
  sBSheep: number;
  sBShark: number;
  sSSheep: number;
  sSShark: number;
  pct_buy_sell_sheep: number;
  pct_buy_sell_shark: number;
  pct_buy_sheep_shark: number;
  pct_sell_sheep_shark: number;
  pct_sum_buy_sheep_shark: number;
  pct_sum_sell_sheep_shark: number;
  pct_sum_buy_sell_sheep: number;
  pct_sum_buy_sell_shark: number;
  diff_sheep: number;
  diff_shark: number;
  diff_sum_sheep: number;
  diff_sum_shark: number;
}

export const calTickRangeData = (data: {
  ticks: any[];
  tradeValue: any;
  viewByValue: any;
  symbol: any;
}):
  | undefined
  | {
      symbol: string;
      data: MarketTickChartDataType[];
      tradeValue: number;
    } => {
  const { ticks, tradeValue, viewByValue, symbol } = data;

  const lastTick = last(ticks);
  if (
    !lastTick ||
    lastTick['symbol'] !== symbol ||
    !Array.isArray(ticks) ||
    ticks.length === 0
  ) {
    return undefined;
  }

  const _data: any[] = [];

  let sBSheep = 0;
  let sBShark = 0;
  let sSSheep = 0;
  let sSShark = 0;

  forEach(sortBy(ticks, 'date'), (tick) => {
    const meta = tick['meta'];
    let bSheep = 0;
    let bShark = 0;
    let sSheep = 0;
    let sShark = 0;

    forEach(meta, (t) => {
      if (viewByValue) {
        if (t.a === 'B') {
          if (t.p * t.vol > tradeValue * 10 ** 6) {
            bShark += t.p * t.vol;
          } else {
            bSheep += t.p * t.vol;
          }
        } else if (t.a === 'S') {
          if (t.p * t.vol > tradeValue * 10 ** 6) {
            sShark += t.p * t.vol;
          } else {
            sSheep += t.p * t.vol;
          }
        }
      } else {
        if (t.a === 'B') {
          if (t.p * t.vol > tradeValue * 10 ** 6) {
            bShark += t.vol;
          } else {
            bSheep += t.vol;
          }
        } else if (t.a === 'S') {
          if (t.p * t.vol > tradeValue * 10 ** 6) {
            sShark += t.vol;
          } else {
            sSheep += t.vol;
          }
        }
      }
    });

    sBShark += bShark;
    sBSheep += bSheep;
    sSSheep += sSheep;
    sSShark += sShark;
    const roundValue = viewByValue ? 10 ** 9 : 1;
    _data.push({
      date: tick.date,
      bSheep: round(bSheep / roundValue, 0),
      bShark: round(bShark / roundValue, 0),
      sSheep: round(sSheep / roundValue, 0),
      sShark: round(sShark / roundValue, 0),
      sBSheep: round(sBSheep / roundValue, 0),
      sBShark: round(sBShark / roundValue, 0),
      sSSheep: round(sSSheep / roundValue, 0),
      sSShark: round(sSShark / roundValue, 0),
      pct_buy_sell_sheep: round(bSheep / (sSheep + bSheep), 2),
      pct_buy_sell_shark: round(bShark / (bShark + sShark), 2),
      pct_buy_sheep_shark: round(bSheep / (bShark + bSheep), 2),
      pct_sell_sheep_shark: round(sSheep / (sShark + sSheep), 2),
      pct_sum_buy_sheep_shark: round(sBSheep / (sBShark + sBSheep), 2),
      pct_sum_sell_sheep_shark: round(sSSheep / (sSShark + sSSheep), 2),
      pct_sum_buy_sell_sheep: round(sBSheep / (sBSheep + sSSheep), 2),
      pct_sum_buy_sell_shark: round(sBShark / (sBShark + sSShark), 2),
      diff_sheep: round((bSheep - sSheep) / roundValue, 0),
      diff_shark: round((bShark - sShark) / roundValue, 0),
      diff_sum_shark: round((sBShark - sSShark) / roundValue, 0),
      diff_sum_sheep: round((sBSheep - sSSheep) / roundValue, 0),
    });
  });

  return {
    symbol,
    data: _data,
    tradeValue,
  };
};
