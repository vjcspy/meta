import { getAdditionalDataByKey } from '@modules/ui/util/getAdditionalDataByKey';
import { useMemo } from 'react';

export const useExtAdditionConfig = (key: string, props: any): any => {
  return useMemo(() => {
    return getAdditionalDataByKey(key, props)?.value;
  }, [props?.extensionDataConfig?.additionalData]);
};
