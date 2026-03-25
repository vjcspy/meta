import { calTickRangeData } from "@/modules/dashboard/utils/cal-tick-range-data";
import type {
  WorkerInput,
  WorkerOutput,
} from "@/modules/dashboard/utils/types";

const ctx = self as unknown as Worker;

ctx.onmessage = (event: MessageEvent<WorkerInput>) => {
  const { symbolTicks, tradeValue } = event.data;

  const results = symbolTicks.map(({ symbol, ticks }) =>
    calTickRangeData({ symbol, ticks, tradeValue }),
  );

  const output: WorkerOutput = { results };
  ctx.postMessage(output);
};
