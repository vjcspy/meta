export const descriptionInfoCheckShowMore = (
  contentDescription: any,
  isMobile?: boolean
) => {
  if (isMobile) {
    if (contentDescription && contentDescription?.length > 100) {
      return true;
    }
  } else {
    if (contentDescription && contentDescription?.length > 1000) {
      return true;
    }
  }

  return false;
};
