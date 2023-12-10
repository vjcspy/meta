import { map } from 'lodash-es';

const res = [1, 3, 5, 15];
export const getTimeResolutionOptions = () =>
  map(res, (value) => ({
    label: `${value}M`,
    value: value,
  }));
