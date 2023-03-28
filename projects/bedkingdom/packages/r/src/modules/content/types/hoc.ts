import { StoreConfig } from '@vjcspy/apollo';

export interface WithHomeActionsProps {
  actions: {
    getBanner: () => void;
  };
}

export interface WithCmsPageProps {
  state: { data: any; loading: boolean };
  actions: {
    getCmsPageData: (id: number) => void;
  };
}

export interface WithNavigatorProps {
  state: {
    navigator: any;
  };
}

export interface WithAppNavigatorProps {
  state: {
    navigator: any;
    categories: any[];
  };
}

export interface WithHomeDataProps {
  state: {
    cmsPages: any[];
  };
}

export interface WithContentAddressActionsProps {
  actions: {
    getProvinceDistrictWardData: () => void;
  };
}

export interface WithContentAddressDataProps {
  state: {
    addressData: any;
  };
  data: {
    ProvinceOptionsFactory: any;
    DistrictOptionsFactory: any;
    WardOptionsFactory: any;
  };
}

export interface WithHomeBrandActionsProps {
  actions: {
    getHomeBrandAction: () => void;
    getBrandCampaignAction: () => void;
    getBannerHomeAction: () => void;
    getBestSellerAction: () => void;
  };
}

export interface WithHomeBrandDataProps {
  state: {
    homeBrand: any;
    brandCampaign: any[];
    bannerHome: any[];
    bestSeller: any[];
  };
}

export interface WithUiConfigDataProps {
  state: {
    uiConfig: StoreConfig;
  };
}

export interface WithCmsPageDetailProps {
  state: {
    selectDetail: (id: string) => any;
  };
}
