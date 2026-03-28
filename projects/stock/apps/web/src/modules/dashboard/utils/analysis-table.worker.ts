import type { AnalysisWorkerInput, AnalysisWorkerOutput } from "@/modules/dashboard/utils/analysis-types";
import { calAnalysisData } from "@/modules/dashboard/utils/cal-analysis-data";

const ctx = self as unknown as Worker;

ctx.onmessage = (event: MessageEvent<AnalysisWorkerInput>) => {
  const rows = calAnalysisData(event.data);
  const output: AnalysisWorkerOutput = { rows };
  ctx.postMessage(output);
};
