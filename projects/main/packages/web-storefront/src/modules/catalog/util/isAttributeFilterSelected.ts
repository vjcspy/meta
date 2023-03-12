import indexOf from 'lodash/indexOf';

export const isAttributeFilterSelected = (
  attributeValue: any,
  filterValue: any
): boolean => {
  if (!filterValue) {
    return false;
  }

  if (filterValue.hasOwnProperty('data')) filterValue = filterValue.data;

  if (filterValue.hasOwnProperty('in')) {
    return indexOf(filterValue.in, attributeValue) > -1;
  }

  if (filterValue.hasOwnProperty('eq')) {
    return filterValue.eq == attributeValue;
  }

  return false;
};
