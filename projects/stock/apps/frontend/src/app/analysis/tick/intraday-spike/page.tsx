import MarketIntraDaySpike from '@modules/analysis/components/MarketIntraDaySpike';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tick Intra-day Spike',
};

export default function Page() {
  return (
    <>
      <MarketIntraDaySpike />
    </>
  );
}
