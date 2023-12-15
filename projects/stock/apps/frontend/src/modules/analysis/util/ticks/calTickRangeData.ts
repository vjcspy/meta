import { forEach, last, sortBy } from 'lodash-es';

export const calTickRangeData = (data: {
  ticks: any[];
  tradeValue: any;
  viewByValue: any;
  symbol: any;
}) => {
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

    _data.push({
      date: tick.date,
      bSheep,
      bShark,
      sSheep,
      sShark,
      sBSheep,
      sBShark,
      sSSheep,
      sSShark,
      pct_buy_sell_sheep: Math.round(bSheep / sSheep),
      pct_buy_sell_shark: Math.round(bShark / sShark),
      pct_buy_sheep_shark: Math.round(bSheep / bShark),
      pct_shell_sheep_shark: Math.round(sSheep / sShark),
      pct_sum_buy_sheep_shark: Math.round(sBSheep / sBShark),
      pct_sum_shell_sheep_shark: Math.round(sSSheep / sSShark),
      close: tick.close,
    });
  });

  return {
    symbol,
    data: _data,
    tradeValue,
  };
};
