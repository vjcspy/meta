import { map } from 'lodash';

const res = [1, 3, 5, 15];
export const getTimeResolutionOptions = () =>
  map(res, (value) => ({
    label: `${value}M`,
    value: value,
  }));
