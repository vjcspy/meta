import { createUiHOC } from '@web/ui-extension';

import { useNavigatorSelectionContainer } from '../../hook/navigator';

export const withNavigatorSelection = createUiHOC(
  (props: { selection: any }) => {
    if (!props.selection) {
      console.error(
        'Props must have `selection` pass from parent to use hoc `withNavigatorSelection`'
      );
    }

    return useNavigatorSelectionContainer(props.selection);
  },
  'withNavigatorSelection'
);
