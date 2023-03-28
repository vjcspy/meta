export const productPriceHasDiscount = (priceRange: any, tierPrice?: any) => {
  return (
    priceRange &&
    ((priceRange.minimum_price?.discount?.amount_off &&
      priceRange.minimum_price?.discount?.amount_off > 0) ||
      (!isNaN(tierPrice?.final_price?.value) &&
        priceRange.maximum_price?.final_price?.value &&
        tierPrice?.final_price?.value <
          priceRange.maximum_price?.final_price?.value))
  );
};
