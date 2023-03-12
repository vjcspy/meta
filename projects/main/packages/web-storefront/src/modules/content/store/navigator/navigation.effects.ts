import { createEffect } from '@main/packages-web-redux/dist/util/createEffect';
import { ofType } from '@main/packages-web-redux/dist/util/ofType';
import forEach from 'lodash/forEach';
import { debounceTime, map, withLatestFrom } from 'rxjs/operators';

import {
  navigatorUpdateMouseLocation,
  navigatorUpdateMouseState,
} from './navigator.actions';
import type { NavigatorState } from './navigator.state';

const whenMouseLocationChangeDebounce$ = createEffect((action$, state$) =>
  action$.pipe(
    ofType(navigatorUpdateMouseLocation),
    debounceTime(50),
    withLatestFrom(state$),
    map(([_action, state]) => {
      let isMouseInside = false;
      const navigatorState: NavigatorState = state.navigator;
      forEach(navigatorState.mouseLocation, (value) => {
        if (value) {
          isMouseInside = true;
        }
      });
      return navigatorUpdateMouseState({ isMouseInside });
    })
  )
);

// const whenMouseLocationChange$ = createEffect((action$, state$) =>
//   action$.pipe(
//     ofType(navigatorUpdateMouseLocation),
//     filter((action: any) => action.payload.state === true),
//     debounceTime(50),
//     withLatestFrom(state$),
//     map(([_action, state]) => {
//       let isMouseInside = false;
//       const navigatorState: NavigatorState = state.navigator;
//       forEach(navigatorState.mouseLocation, (value) => {
//         if (value) {
//           isMouseInside = true;
//         }
//       });
//       return navigatorUpdateMouseState({ isMouseInside });
//     })
//   )
// );

export const NAVIGATOR_EFFECTS = [
  whenMouseLocationChangeDebounce$,
  // whenMouseLocationChange$,
];
