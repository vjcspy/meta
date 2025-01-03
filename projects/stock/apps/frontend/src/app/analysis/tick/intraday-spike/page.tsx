import MarketIntraDaySpike from '@modules/analysis/components/MarketIntraDaySpike';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Intra-day Sum',
};

export default function Page() {
  return (
    <>
      <MarketIntraDaySpike />
    </>
  );
}
