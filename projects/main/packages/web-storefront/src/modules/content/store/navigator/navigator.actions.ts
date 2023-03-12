import { createAction } from '@main/packages-web-redux/dist/util/createAction';

const prefix = 'ui-navigator';

const NAVIGATOR_GOT_DATA = 'NAVIGATOR_GOT_DATA';
export const navigatorGotData = createAction<{
  selections: any;
}>(NAVIGATOR_GOT_DATA, prefix);

const NAVIGATOR_ACTIVATE_SELECTION = 'NAVIGATOR_ACTIVATE_SELECTION';
/**
 * Khi hover
 */
export const navigatorActivateItem = createAction<{
  selection: any;
}>(NAVIGATOR_ACTIVATE_SELECTION, prefix);

const NAVIGATOR_SELECT_SELECTION = 'NAVIGATOR_SELECT_SELECTION';
/**
 * Khi click/submit
 */
export const navigatorSelectItem = createAction<{
  selection: any;
}>(NAVIGATOR_SELECT_SELECTION, prefix);

const NAVIGATOR_UPDATE_MOUSE_STATE = 'NAVIGATOR_UPDATE_MOUSE_STATE';
/**
 * Mouse có đang nằm trong navigator hay không
 */
export const navigatorUpdateMouseState = createAction<{
  isMouseInside: boolean;
}>(NAVIGATOR_UPDATE_MOUSE_STATE, prefix);

const NAVIGATOR_UPDATE_MOUSE_LOCATION = 'NAVIGATOR_UPDATE_MOUSE_LOCATION';
/**
 * Vị trí hiện tại của mouse
 */
export const navigatorUpdateMouseLocation = createAction<{
  location: string;
  state: boolean;
}>(NAVIGATOR_UPDATE_MOUSE_LOCATION, prefix);
