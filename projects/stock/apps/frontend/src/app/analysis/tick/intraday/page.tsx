import TickIntraDay from '@modules/analysis/components/TickIntraDay';
import Symbol from '@src/modules/analysis/components/Symbol';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Intra-day',
};

const IntraDay = () => {
  return (
    <>
      <Symbol tradeValue={true} />
      <TickIntraDay />
    </>
  );
};

export default IntraDay;
