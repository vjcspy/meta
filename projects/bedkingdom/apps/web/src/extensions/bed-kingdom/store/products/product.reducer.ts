import { bedSetAmLabelProduct } from '@extensions/bed-kingdom/store/products/product.actions';
import { bedAmProductStateFactory } from '@extensions/bed-kingdom/store/products/product.state';
import { createReducer } from '@reduxjs/toolkit';

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
