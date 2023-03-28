export interface ContentState {
  banners: any[];
  homeBrand: any;
  brandCampaign: any[];
  bestSeller: any[];
  isLoadedAddressData: boolean;
  cmsPages: any[];
}

export const ContentStateFactory = (): ContentState => ({
  banners: [],
  homeBrand: {},
  brandCampaign: [],
  bestSeller: [],
  isLoadedAddressData: false,
  cmsPages: [],
});
