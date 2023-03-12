import { useDispatch, useSelector } from '@main/packages-web-redux';
import { useCallback } from 'react';

import {
  navigatorActivateItem,
  navigatorGotData,
  navigatorUpdateMouseLocation,
} from '../../store/navigator/navigator.actions';
import type { NavigatorState } from '../../store/navigator/navigator.state';

const selectList = (state: { navigator: NavigatorState }) => {
  return state?.navigator?.selections;
};

const selectMouseState = (state: { navigator: NavigatorState }) =>
  state?.navigator?.mouseLocation['navigator-container'] === true;

export const useNavigatorData = () => {
  const dispatch = useDispatch();
  const navigatorGotDataAction = useCallback(
    (selections: any) => {
      dispatch(navigatorGotData({ selections }));
    },
    [dispatch]
  );

  const updateMouseLocation = useCallback(
    (location: string, state: boolean) => {
      dispatch(navigatorUpdateMouseLocation({ location, state }));
    },
    [dispatch]
  );

  const activateNav = useCallback(
    (selection: any) => dispatch(navigatorActivateItem({ selection })),
    [dispatch]
  );

  const selections = useSelector(selectList);
  const mouseState = useSelector(selectMouseState);

  return {
    state: { selections, mouseState },
    actions: {
      navigatorGotDataAction,
      updateMouseLocation,
      activateNav,
    },
  };
};
