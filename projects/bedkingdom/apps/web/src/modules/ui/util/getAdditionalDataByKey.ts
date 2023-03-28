export const getAdditionalDataByKey = (key: string, props: any): any => {
  const data: any = props?.extensionDataConfig?.additionalData ?? props;
  return Array.isArray(data)
    ? data.find((v: any) => v?.key === key)
    : undefined;
};
