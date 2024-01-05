import Symbol from '@modules/analysis/components/Symbol';
import TickRange from '@modules/analysis/components/TickRange';
import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Symbol Range',
};

export default function TickDates() {
  return (
    <>
      <Symbol fromDate={true} toDate={true} tradeValue={true} />
      <TickRange />
    </>
  );
}
