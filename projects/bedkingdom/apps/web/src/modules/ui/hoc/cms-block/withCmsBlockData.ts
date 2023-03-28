import { useCmsBlockData } from '@modules/ui/hook/cms-block/useCmsBlockData';
import { createUiHOC } from '@web/ui-extension';

export default createUiHOC((props) => {
  return useCmsBlockData(props);
}, 'withCmsBlockData');
