import { combineHOC } from '@web/ui-extension';

import FromDate from '@/components/analysis/FromDate';
import PlotHullma from '@/components/analysis/PlotHullma';
import Symbol from '@/components/analysis/Symbol';
import SymbolPrices from '@/components/analysis/SymbolPrices';
import ToDate from '@/components/analysis/ToDate';
import { withHullmaIntraDay } from '@/hoc/analysis/withHullmaIntraDay';
import { withHullmaIntraDayFetchData } from '@/hoc/analysis/withHullmaIntraDayFetchData';

const Hullma = combineHOC(
    withHullmaIntraDay,
    withHullmaIntraDayFetchData,
)((props) => {
    return (
        <>
            <Symbol />
            <FromDate />
            <ToDate />
            <SymbolPrices />
            <PlotHullma
                title="Hullma 5mins"
                hullmaIntraDay={props.state.hullmaIntraDay?.hullma5 ?? []}
            />
            <PlotHullma
                title="Hullma 15mins"
                hullmaIntraDay={props.state.hullmaIntraDay?.hullma15 ?? []}
            />
            <PlotHullma
                title="Hullma 30mins"
                hullmaIntraDay={props.state.hullmaIntraDay?.hullma30 ?? []}
            />
        </>
    );
});

export default Hullma;
