import type { BedAmProductState } from '@extensions/bed-kingdom/store/products/product.state';

export const selectAmLabelProduct = (state: {
  bed_king: { am_label: BedAmProductState };
}) => state.bed_king?.am_label?.amLabelProduct;
