import { createSelector } from '@main/packages-web-redux';
import type { ContentState } from '@modules/content/store/state';
import memoize from 'lodash/memoize';

export const selectBanners = (state: { content: ContentState }) =>
  state.content.banners;

export const selectHomeBrand = (state: { content: ContentState }) =>
  state.content.homeBrand;

export const selectBrandCampaign = (state: { content: ContentState }) =>
  state.content.brandCampaign;

export const selectBestSeller = (state: { content: ContentState }) =>
  state.content.bestSeller;

export const selectCmsPages = (state: { content: ContentState }) =>
  state.content.cmsPages;

export const selectCmsPageDetail: any = createSelector(
  (state: { content: ContentState }) => state.content?.cmsPages,
  (cmsPages: any[]) =>
    memoize((identifier: string) =>
      cmsPages.find((p) => p.identifier === identifier)
    )
);
