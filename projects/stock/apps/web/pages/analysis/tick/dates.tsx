import FromDate from '@/components/analysis/FromDate';
import Symbol from '@/components/analysis/Symbol';
import SymbolPrices from '@/components/analysis/SymbolPrices';
import SymbolTicks from '@/components/analysis/SymbolTicks';
import ToDate from '@/components/analysis/ToDate';

export default function TickDates() {
    return (
        <>
            <Symbol />
            <FromDate />
            <ToDate />
            <SymbolPrices />
            <SymbolTicks />
        </>
    );
}
