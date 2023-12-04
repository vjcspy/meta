import { useSelectFromState } from '@src/store/selectFromState';
import { createUiHOC } from '@web/ui-extension';

export const withThemState = createUiHOC(() => {
  const themeState = useSelectFromState((state) => state.themeConfig);
  return {
    state: {
      themeState,
    },
  };
}, '');
