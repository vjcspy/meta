import MarketRange from '@src/modules/analysis/components/MarketRange';
import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Market Range',
};
export default function TickRangeMarket() {
  return <MarketRange />;
}
