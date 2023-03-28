import { createBuilderCallback } from '@main/packages-web-redux/dist/util/createBuilderCallback';
import { getContentAddressDataAfterAction } from '@modules/content/store/address/actions';
import type { ContentState } from '@modules/content/store/state';

export const addressBuilderCallback = createBuilderCallback<ContentState>(
  (builder) => {
    builder.addCase(getContentAddressDataAfterAction, (state) => {
      state.isLoadedAddressData = true;
    });
  }
);
