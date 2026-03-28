import type { AnalysisRow, AnalysisWorkerInput } from "./analysis-types";

function sumField(prices: ReturnType<typeof slicePrices>, field: "value" | "buyForeignValue" | "sellForeignValue"): number {
  return Math.round(prices.reduce((acc, p) => acc + p[field], 0) / 1000);
}

function slicePrices<T extends { date: string }>(sorted: T[], toDate: string, n: number): T[] {
  const upToDate = sorted.filter((p) => p.date <= toDate);
  return upToDate.slice(-n);
}

export function calAnalysisData(input: AnalysisWorkerInput): AnalysisRow[] {
  const { symbolPrices, cors, fromDate, toDate, tradeValueFilter } = input;

  const corMap = new Map(cors.map((c) => [c.code, c]));
  const rows: AnalysisRow[] = [];

  for (const { symbol, prices } of symbolPrices) {
    const sorted = [...prices].sort((a, b) => a.date.localeCompare(b.date));

    const rangePrices = sorted.filter((p) => p.date >= fromDate && p.date <= toDate);
    const upToDate = sorted.filter((p) => p.date <= toDate);
    const last7 = upToDate.slice(-7);
    const last15 = upToDate.slice(-15);
    const last30 = upToDate.slice(-30);

    const trade_value_7 = sumField(last7, "value");
    const trade_value_15 = sumField(last15, "value");
    const trade_value_30 = sumField(last30, "value");
    const trade_value_range = sumField(rangePrices, "value");

    if (tradeValueFilter > 0 && Math.max(trade_value_7, trade_value_15, trade_value_30) < tradeValueFilter) {
      continue;
    }

    const foreign_buy_7 = sumField(last7, "buyForeignValue");
    const foreign_buy_15 = sumField(last15, "buyForeignValue");
    const foreign_buy_30 = sumField(last30, "buyForeignValue");
    const foreign_buy_range = sumField(rangePrices, "buyForeignValue");

    const foreign_sell_7 = sumField(last7, "sellForeignValue");
    const foreign_sell_15 = sumField(last15, "sellForeignValue");
    const foreign_sell_30 = sumField(last30, "sellForeignValue");
    const foreign_sell_range = sumField(rangePrices, "sellForeignValue");

    const cor = corMap.get(symbol);

    rows.push({
      symbol,
      industryName1: cor?.industryName1 ?? "",
      industryName2: cor?.industryName2 ?? "",
      industryName3: cor?.industryName3 ?? "",
      totalShares: cor?.totalShares ?? 0,

      trade_value_7,
      trade_value_15,
      trade_value_30,
      trade_value_range,

      foreign_buy_7,
      foreign_buy_15,
      foreign_buy_30,
      foreign_buy_range,

      foreign_sell_7,
      foreign_sell_15,
      foreign_sell_30,
      foreign_sell_range,

      foreign_diff_7: foreign_buy_7 - foreign_sell_7,
      foreign_diff_15: foreign_buy_15 - foreign_sell_15,
      foreign_diff_30: foreign_buy_30 - foreign_sell_30,
      foreign_diff_range: foreign_buy_range - foreign_sell_range,

      l16_hullma_trend: 0,
      l16_hullma_day_in_trend: 0,
      l16_hullma_highest_diff_percent: 0,
    });
  }

  return rows;
}
