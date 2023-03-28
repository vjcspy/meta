import { createAction } from '@main/packages-web-redux/dist/util/createAction';

const PREFIX = 'bed_king_amLabel';

const BED_SET_AM_LABEL_PRODUCT = 'BED_SET_AM_LABEL_PRODUCT';
export const bedSetAmLabelProduct = createAction<{
  data: any;
}>(BED_SET_AM_LABEL_PRODUCT, PREFIX);
