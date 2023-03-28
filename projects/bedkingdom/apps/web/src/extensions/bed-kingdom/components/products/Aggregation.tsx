import AggregationOrigin from '@modules/catalog/components/products/Aggregation';
import { withProductsFiltersData } from '@vjcspy/r/build/modules/catalog/hoc/products/withProductsFiltersData';
import { withDefaultAttributeData } from '@vjcspy/r/build/modules/catalog/hoc/withDefaultAttributeData';
import { combineHOC } from '@web/ui-extension';

const Aggregation = combineHOC(
  withDefaultAttributeData,
  withProductsFiltersData
)(AggregationOrigin.OriginComponent);

export default Aggregation;
