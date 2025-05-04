import { v4 } from 'uuid';

export const randomId = (): string => {
  return v4();
};
