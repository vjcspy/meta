import { useWebWorker } from '@modules/app/hooks/useWebWorker';
import { createUiHOC } from '@web/ui-extension';
import { useState } from 'react';

export const withCalTickRageWorker = createUiHOC(() => {
  const [tickRageData, setTickRageData] = useState<any>();

  const { emmit: calTickRangeData } = useWebWorker(
    () =>
      new Worker(
        new URL(
          '@modules/analysis/workers/calTickRangeData.worker.ts',
          import.meta.url,
        ),
      ),
    (data: any) => setTickRageData(data?.data),
  );

  return {
    state: { tickRageData },
    actions: {
      calTickRangeData,
    },
  };
});
