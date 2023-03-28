import { createReducer } from '@main/packages-web-redux';
import { productReducer } from '@vjcspy/r/build/modules/catalog/store/product/product.reducer';
import { reduceReducer } from '@vjcspy/r/build/util/reduce-reducers';

import type { WebProductState } from './product.state';
import { WebProductStateFactory } from './product.state';

const reducer = createReducer<WebProductState>(WebProductStateFactory(), () => {
  //EMPTY
});

export const webProductReducer = reduceReducer(
  WebProductStateFactory(),
  productReducer,
  reducer
);
