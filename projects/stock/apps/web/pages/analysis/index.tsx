import AnalysisTable from '@/components/analysis/AnalysisTable';
import CapFilter from '@/components/analysis/AnalysisTable/CapFilter';
import FilterTradeValue from '@/components/analysis/FilterTradeValue';

export default function Analysis() {
    return (
        <>
            <FilterTradeValue />
            <CapFilter />
            <AnalysisTable />
        </>
    );
}
