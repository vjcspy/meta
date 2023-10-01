import { numberValidator } from '@modules/core/util/json-rule-engine/validator/numberValidator';
import { Operator } from 'json-rules-engine';

export const lte = new Operator(
  'lte',
  (factValue, jsonValue) => jsonValue <= factValue,
  numberValidator,
);
