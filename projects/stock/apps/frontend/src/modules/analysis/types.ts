import type { TickAction } from '@stock/packages-com';

export interface MarketSymbolCategory {
  key: string;
  name: string;
  symbols: string[];
}

export interface TickPriceRecord {
  time: string;
  vol: number;
  p: number;
  a: TickAction;
}
