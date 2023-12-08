import { createUiHOC } from '@web/ui-extension';
import { debounce } from 'lodash';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

export const withCalTickRageWorker = createUiHOC(() => {
  const [tickRageData, setTickRageDate] = useState<any>();

  const workerRef = useRef<any>();

  useEffect(() => {
    workerRef.current = new Worker(
      new URL('../workers/calTickRangeData.worker.ts', import.meta.url),
    );
    workerRef.current.onmessage = (event: any) => {
      if (event?.data) {
        console.log('Receive tick range data from service worker');
        setTickRageDate(event.data);
      }
    };

    return () => {
      workerRef.current?.terminate();
    };
  }, []);

  const calDebounce = useMemo(
    () =>
      debounce(
        (data: {
          ticks: any[];
          tradeValue: any;
          viewByValue: any;
          symbol: any;
        }) => {
          console.log('Send to service worker to calculate tick range data');
          workerRef.current?.postMessage(data);
        },
        500,
      ),
    [workerRef?.current],
  );

  const calTickRangeData = useCallback(
    (data: {
      ticks: any[];
      tradeValue: any;
      viewByValue: any;
      symbol: any;
    }) => {
      calDebounce(data);
    },
    [],
  );

  return {
    state: { tickRageData },
    actions: {
      calTickRangeData,
    },
  };
}, 'withCalTickRageWorker');
