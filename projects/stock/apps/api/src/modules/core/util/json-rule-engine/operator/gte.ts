import { numberValidator } from '@modules/core/util/json-rule-engine/validator/numberValidator';
import { Operator } from 'json-rules-engine';

export const gte = new Operator(
  'gte',
  (factValue, jsonValue) => jsonValue >= factValue,
  numberValidator,
);
