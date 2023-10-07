import FromDate from '@/components/analysis/FromDate';
import PlotHullma from '@/components/analysis/PlotHullma';
import Symbol from '@/components/analysis/Symbol';
import SymbolPrices from '@/components/analysis/SymbolPrices';
import ToDate from '@/components/analysis/ToDate';

const Hullma = () => {
    return (
        <>
            <Symbol />
            <FromDate />
            <ToDate />
            <SymbolPrices />
            <PlotHullma />
        </>
    );
};

export default Hullma;
