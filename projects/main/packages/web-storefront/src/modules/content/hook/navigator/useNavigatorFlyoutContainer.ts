import { useCallback } from 'react';

import { useNavigatorFlyoutStore } from './useNavigatorFlyoutStore';

export const useNavigatorFlyoutContainer = () => {
  const store = useNavigatorFlyoutStore();

  const whenMouseLeave = useCallback(() => {
    store.actions.updateMouseLocation('navigator-flyout-container', false);
  }, []);

  const whenMouseEnter = useCallback(() => {
    store.actions.updateMouseLocation('navigator-flyout-container', true);
  }, []);

  return {
    whenMouseLeave,
    whenMouseEnter,
    selection: store.state.flyoutSelection,
  };
};
