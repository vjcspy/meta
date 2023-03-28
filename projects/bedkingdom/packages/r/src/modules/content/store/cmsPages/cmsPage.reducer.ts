import { createBuilderCallback } from '@main/packages-web-redux/dist/util/createBuilderCallback';

import type { ContentState } from '../state';
import { getCmsPageAfterAction } from './cmsPage.actions';

export const cmsPageReducerCallback = createBuilderCallback<ContentState>(
  (builder) => {
    builder.addCase(getCmsPageAfterAction, (state, action) => {
      state.cmsPages = action.payload.cmsPages;
    });
  }
);
