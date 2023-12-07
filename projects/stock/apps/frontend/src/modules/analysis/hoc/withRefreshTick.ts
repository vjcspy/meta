import { ANALYSIS_ACTIONS } from '@modules/analysis/store/analysis.actions';
import { CommonValue } from '@modules/analysis/value/common.value';
import type { IRootState } from '@src/store';
import { useAppDispatch } from '@src/store/useAppDispatch';
import { isTradingTime } from '@stock/packages-com/dist/util/isTradingTime';
import { useSelector } from '@stock/packages-redux';
import { createUiHOC } from '@web/ui-extension';
import { useEffect } from 'react';
import { auditTime, groupBy, mergeMap, Subject } from 'rxjs';

const refreshTickRequest$ = new Subject<string>();
refreshTickRequest$
  .pipe(
    groupBy((symbol) => symbol),
    mergeMap((group: any) => {
      return group.pipe(auditTime(CommonValue.REFRESH_WINDOW_TIME));
    }),
  )
  .subscribe((symbol: any) => {
    // console.log(`refresh tick for: ${symbol}`, { symbol });
    requestRefreshTick(symbol);
  });

const requestRefreshTick = (symbol: string) => {
  const url = `${process.env.NEXT_PUBLIC_ENDPOINT_LIVE_URL}/tick/refresh-tick?symbol=${symbol}`;

  fetch(url).then().catch();
};

export const withRefreshTicks = createUiHOC(() => {
  const symbol = useSelector((state: IRootState) => state.analysis.symbol);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const _i = setInterval(() => {
      if (isTradingTime()) {
        if (symbol) {
          refreshTickRequest$.next(symbol);
          setTimeout(() => {
            dispatch(ANALYSIS_ACTIONS.refreshTickIntraDay());
          }, 1000);
        }
      }
    }, 2000);

    return () => {
      clearInterval(_i);
    };
  }, [symbol]);

  return {};
}, 'withRefreshTick');
