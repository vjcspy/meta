import { createReducer } from '@main/packages-web-redux';
import { productReducer } from '@vjcspy/r/build/modules/catalog/store/product/product.reducer';
import { reduceReducer } from '@vjcspy/r/build/util/reduce-reducers';

import { WebProductState, WebProductStateFactory } from './product.state';

const reducer = createReducer<WebProductState>(
  WebProductStateFactory(),
  () => {}
);

export const webProductReducer = reduceReducer(
  WebProductStateFactory(),
  productReducer,
  reducer
);
