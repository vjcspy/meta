import Filter from '@modules/catalog/components/products/Filter';
import { withProductsFilterActions } from '@vjcspy/r/build/modules/catalog/hoc/products/withProductsFilterActions';
import { withDefaultAttributeData } from '@vjcspy/r/build/modules/catalog/hoc/withDefaultAttributeData';
import { combineHOC } from '@web/ui-extension';

const FilterCustom = combineHOC(
  withDefaultAttributeData,
  withProductsFilterActions
)(Filter.OriginComponent);

export default FilterCustom;
