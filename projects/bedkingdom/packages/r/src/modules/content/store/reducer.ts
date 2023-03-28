import { addressBuilderCallback } from '@modules/content/store/address/reducer';
import { cmsPageReducerCallback } from '@modules/content/store/cmsPages/cmsPage.reducer';
import { ContentStateFactory } from '@modules/content/store/state';
import { createReducer } from '@main/packages-web-redux';

export const contentReducer = createReducer(
  ContentStateFactory(),
  (builder) => {
    addressBuilderCallback(builder);
    cmsPageReducerCallback(builder);
  }
);
