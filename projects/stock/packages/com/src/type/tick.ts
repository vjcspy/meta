export interface IntraDayTickInfo {
  ts: number;
  sheep_buy: number;
  sheep_sell: number;
  shark_buy: number;
  shark_sell: number;

  sum_sheep_buy: number;
  sum_sheep_sell: number;
  diff_sum_sheep: number;
  sum_shark_buy: number;
  sum_shark_sell: number;
  diff_sum_shark: number;
}
