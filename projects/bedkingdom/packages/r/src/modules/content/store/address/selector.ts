import { ContentState } from '@modules/content/store/state';

export const selectIsLoadedContentAddressData = (state: {
  content: ContentState;
}) => state.content.isLoadedAddressData;
