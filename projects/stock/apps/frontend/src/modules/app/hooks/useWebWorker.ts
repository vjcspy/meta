import { formatContext } from '@web/base/dist/lib/logger/console-template/format-content';
import { debounce } from 'lodash';
import { useCallback, useEffect, useMemo, useRef } from 'react';

export const useWebWorker = <T>(
  constructor: () => Worker,
  onMessage: (data: any) => void,
  config?: {
    debounceTime: number;
  },
) => {
  const workerRef = useRef<any>();

  useEffect(() => {
    const w = constructor();
    workerRef.current = w;
    w.onmessage = (event: any) => {
      // console.log(event);
      if (event?.data) {
        console.log(`${formatContext('Worker')} Received data from worker`);
        onMessage(event.data);
      }
    };
    w.onerror = (event: any) => {
      console.error(
        `${formatContext('Worker')} There is an error with worker!`,
        event,
      );
    };

    return () => {
      workerRef.current?.terminate();
    };
  }, []);

  const calDebounce = useMemo(
    () =>
      debounce(
        (data: T) => {
          if (workerRef.current?.postMessage) {
            console.log(
              `${formatContext('Worker')} Send data to service worker`,
            );
            workerRef.current?.postMessage(data);
          }
        },
        config?.debounceTime ?? 500,
      ),
    [workerRef?.current],
  );

  const emmit = useCallback(
    (data: T) => {
      calDebounce(data);
    },
    [calDebounce],
  );

  return {
    emmit,
  };
};
