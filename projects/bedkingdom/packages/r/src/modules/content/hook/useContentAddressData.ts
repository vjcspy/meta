import { useSelector } from '@main/packages-web-redux';
import { ContentConstant } from '@modules/content/util/constant';
import { Registry } from 'chitility';
import find from 'lodash/find';
import map from 'lodash/map';
import reduce from 'lodash/reduce';
import { useMemo } from 'react';

import { selectIsLoadedContentAddressData } from '../store/address/selector';

export const useContentAddressData = () => {
  const isLoadedContentAdd = useSelector(selectIsLoadedContentAddressData);

  const addressData = useMemo(() => {
    if (isLoadedContentAdd) {
      return Registry.getInstance().registry(ContentConstant.ADDRESS_DATA_KEY);
    }

    return null;
  }, [isLoadedContentAdd]);

  const ProvinceOptionsFactory = useMemo(() => {
    return (value = 'value', label = 'label') => {
      return Array.isArray(addressData?.provinces)
        ? map(addressData.provinces, (p) => {
            const data: any = {};
            data[value] = p['name'];
            data[label] = p['name'];
            return data;
          })
        : [];
    };
  }, [addressData]);

  const DistrictOptionsFactory = useMemo(() => {
    return (provinceName: string, value = 'value', label = 'label') => {
      const province = addressData.provinces.find(
        (p: any) => p['name'] === provinceName
      );

      if (province) {
        return Array.isArray(addressData.districts[province.id])
          ? map(addressData.districts[province.id], (p) => {
              const data: any = {};
              data[value] = p['name'];
              data[label] = p['name'];
              return data;
            })
          : [];
      }
      return [];
    };
  }, [addressData]);

  const WardOptionsFactory = useMemo(() => {
    return (districtName: string, value = 'value', label = 'label') => {
      const district = find(
        reduce(addressData.districts, (re, dt) => {
          re = [...re, ...dt];
          return re;
        }),
        (d: any) => d['name'] === districtName
      );

      if (district) {
        return Array.isArray(addressData.wards[district.id])
          ? map(addressData.wards[district.id], (p) => {
              const data: any = {};
              data[value] = p['name'];
              data[label] = p['name'];
              return data;
            })
          : [];
      }
      return [];
    };
  }, [addressData]);

  return {
    state: { addressData },
    data: {
      ProvinceOptionsFactory,
      DistrictOptionsFactory,
      WardOptionsFactory,
    },
  };
};
