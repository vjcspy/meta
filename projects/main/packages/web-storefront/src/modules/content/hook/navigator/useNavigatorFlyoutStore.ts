import { useDispatch, useSelector } from '@main/packages-web-redux';
import { useCallback } from 'react';

import { navigatorUpdateMouseLocation } from '../../store/navigator/navigator.actions';
import type { NavigatorState } from '../../store/navigator/navigator.state';

export const useNavigatorFlyoutStore = () => {
  const flyoutSelection = useSelector(
    (state: { navigator: NavigatorState }) => {
      return state.navigator.flyoutSelection;
    }
  );
  const dispatch = useDispatch();

  const updateMouseLocation = useCallback(
    (location: string, state: boolean) => {
      dispatch(navigatorUpdateMouseLocation({ location, state }));
    },
    [dispatch]
  );

  return {
    state: {
      flyoutSelection,
    },
    actions: {
      updateMouseLocation,
    },
  };
};
