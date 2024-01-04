import MarketIntraDay from '@modules/analysis/components/MarketIntraDay';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Intra-day Sum',
};

export default function Page() {
  return (
    <>
      <MarketIntraDay />
    </>
  );
}
