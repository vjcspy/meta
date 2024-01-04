import IntraDaySpeed from '@modules/analysis/components/IntraDaySpeed';
import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Intra-day Speed',
};
export default function Page() {
  return <IntraDaySpeed />;
}
