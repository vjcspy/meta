import type { IRootState } from '@src/store';
import { useSelector } from '@stock/packages-redux';
import { createUiHOC } from '@web/ui-extension';
import { useEffect } from 'react';

const requestRefreshTick = (symbol: string) => {
  const url = `${process.env.NEXT_PUBLIC_ENDPOINT_LIVE_URL}/tick/refresh-tick?symbol=${symbol}`;

  fetch(url).then().catch();
};

export const withRefreshTicks = createUiHOC(() => {
  const symbol = useSelector((state: IRootState) => state.analysis.symbol);
  useEffect(() => {
    const _i = setInterval(() => {
      if (symbol) requestRefreshTick(symbol);
    }, 5000);

    return () => {
      clearInterval(_i);
    };
  }, [symbol]);

  return {};
}, 'withRefreshTick');
