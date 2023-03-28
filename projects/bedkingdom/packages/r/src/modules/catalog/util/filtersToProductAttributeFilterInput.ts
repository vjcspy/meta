import { ProductAttributeFilterInput } from '@vjcspy/apollo';

export function filtersToProductAttributeFilterInput(
  filters: any[]
): ProductAttributeFilterInput {
  if (Array.isArray(filters)) {
    const filter: any = {};
    filters.forEach((value) => {
      if (
        value.hasOwnProperty('code') &&
        value.hasOwnProperty('data') &&
        value.code !== 'q'
      ) {
        if (value['code'] === 'price') {
          const val = value['data']?.eq.split('_');
          if (val[0] && val[1]) {
            filter[value['code']] = { from: val[0], to: val[1] };
          } else {
            filter[value['code']] = value['data'];
          }
        } else {
          filter[value['code']] = value['data'];
        }
      }
    });
    return filter;
  }
  return {};
}
