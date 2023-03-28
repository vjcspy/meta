import { bedSetAmLabelProduct } from '@extensions/bed-kingdom/store/products/product.actions';
import { bedAmProductStateFactory } from '@extensions/bed-kingdom/store/products/product.state';
import { createReducer } from '@main/packages-web-redux';

export const bedAmLabelReducer = createReducer(
  bedAmProductStateFactory(),
  (builder) => {
    builder.addCase(bedSetAmLabelProduct, (state, action) => {
      state.amLabelProduct = Object.assign(
        state.amLabelProduct,
        action.payload.data
      );
    });
  }
);
