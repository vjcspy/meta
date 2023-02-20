import { useMemo } from 'react';

export const useExtAdditionalData = (props: any, key: string) => {
  const data = useMemo(() => {
    const cfg = props.extensionDataConfig?.additionalData?.find(
      (c: any) => c['key'] === key
    );

    return cfg?.value;
  }, [props?.extensionDataConfig?.additionalData]);

  return { data };
};
