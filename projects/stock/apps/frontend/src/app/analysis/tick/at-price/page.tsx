import Symbol from '@modules/analysis/components/Symbol';
import TickAtPrices from '@src/modules/analysis/components/TickAtPrices';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'At Price',
};
export default function TickAtPrice() {
  return (
    <>
      <Symbol fromDate={true} toDate={true} tradeValue={true} />
      <TickAtPrices />
    </>
  );
}
