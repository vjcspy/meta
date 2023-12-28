import { formatContext } from '@web/base/dist/lib/logger/console-template/format-content';
import { debounce } from 'lodash-es';
import { useCallback, useEffect, useMemo, useRef } from 'react';

export const useWebWorker = <T>(
  constructor: () => Worker,
  onMessage: (data: any) => void,
  config?: {
    context?: string;
    debounceTime: number;
  },
) => {
  const workerRef = useRef<any>();
  const context = useMemo(() => {
    return config?.context ?? 'Worker';
  }, [config?.context]);

  useEffect(() => {
    const w = constructor();
    workerRef.current = w;
    w.onmessage = (event: any) => {
      // console.log(event);
      if (event?.data) {
        console.log(`${formatContext(context)} Received data from worker`);
        onMessage(event.data);
      }
    };
    w.onerror = (event: any) => {
      console.error(
        `${formatContext(context)} There is an error with worker!`,
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
              `${formatContext(context)} Send data to service worker`,
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
