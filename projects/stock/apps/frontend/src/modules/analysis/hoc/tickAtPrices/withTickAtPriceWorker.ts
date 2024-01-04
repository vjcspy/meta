import type { TickPriceRecord } from '@modules/analysis/types';
import { useWebWorker } from '@modules/app/hooks/useWebWorker';
import { createUiHOC } from '@web/ui-extension/dist';
import { useCallback, useState } from 'react';

export default createUiHOC(() => {
  const [summaryData, setSummary] = useState<any>();

  const { emmit } = useWebWorker(
    () =>
      new Worker(
        new URL(
          '@modules/analysis/workers/calTickPriceSummary.worker.ts',
          import.meta.url,
        ),
      ),
    (data: any) => setSummary(data),
    {
      context: 'TickSummaryWorker',
      debounceTime: 1000,
    },
  );

  const calSummaryData = useCallback(
    (data: TickPriceRecord[]) => {
      if (data?.length > 0) {
        emmit(data);
      }
    },
    [emmit],
  );

  return {
    state: { summaryData },
    actions: {
      calSummaryData,
    },
  };
});
