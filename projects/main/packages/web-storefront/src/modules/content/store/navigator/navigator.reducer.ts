import { createReducer } from '@main/packages-web-redux';

import {
  navigatorActivateItem,
  navigatorGotData,
  navigatorUpdateMouseLocation,
  navigatorUpdateMouseState,
} from './navigator.actions';
import { NavigatorStateFactory } from './navigator.state';

export const navigatorReducer = createReducer(
  NavigatorStateFactory(),
  (builder) => {
    builder
      .addCase(navigatorGotData, (state, action) => {
        state.selections = action.payload.selections;

        return state;
      })
      .addCase(navigatorUpdateMouseLocation, (state, action) => {
        state.mouseLocation[action.payload.location] = action.payload.state;

        return state;
      })
      .addCase(navigatorUpdateMouseState, (state, action) => {
        state.isMouseInside = action.payload.isMouseInside;

        if (!state.isMouseInside) {
          state.flyoutSelection = undefined;
        }
        return state;
      })
      .addCase(navigatorActivateItem, (state, action) => {
        state.flyoutSelection = action.payload.selection;

        return state;
      });
  }
);
