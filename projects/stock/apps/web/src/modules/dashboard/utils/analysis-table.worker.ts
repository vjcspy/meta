import { calAnalysisData } from "@/modules/dashboard/utils/cal-analysis-data";
import type { AnalysisWorkerInput, AnalysisWorkerOutput } from "@/modules/dashboard/utils/analysis-types";

const ctx = self as unknown as Worker;

ctx.onmessage = (event: MessageEvent<AnalysisWorkerInput>) => {
  const rows = calAnalysisData(event.data);
  const output: AnalysisWorkerOutput = { rows };
  ctx.postMessage(output);
};
