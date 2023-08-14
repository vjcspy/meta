import { toDecimal } from 'chitility/dist/util/misc/toDecimal';
import { camelCase } from 'lodash';
import * as yup from 'yup';

const bscPriceSchema = yup.object().shape({
  date: yup.date().required(),
  symbol: yup.string().required(),
  priceHigh: yup.number().required(),
  priceLow: yup.number().required(),
  priceOpen: yup.number().required(),
  priceAverage: yup.number().required(),
  priceClose: yup.number().required(),
  pricePreviousClose: yup.number().required(),
  priceBasic: yup.number().required(),
  totalVolume: yup.number().required(),
  dealVolume: yup.number().required(),
  volume: yup.number().required(),
  putthroughVolume: yup.number().required(),
  totalTrade: yup
    .number()
    .required()
    .transform((value) => parseInt(value)),
  totalValue: yup
    .number()
    .required()
    .transform((value) => parseInt(value)),
  putthroughValue: yup
    .number()
    .required()
    .transform((value) => parseInt(value)),
  buyForeignQuantity: yup.number().required(),
  buyForeignValue: yup
    .number()
    .required()
    .transform((value) => parseInt(value)),
  sellForeignQuantity: yup.number().required(),
  sellForeignValue: yup
    .number()
    .required()
    .transform((value) => parseInt(value)),
  buyCount: yup.number().required(),
  buyQuantity: yup.number().required(),
  sellCount: yup.number().required(),
  sellQuantity: yup.number().required(),
  // buyAvg: yup
  //   .number()
  //   .required()
  //   .transform((value) => toDecimal(value)),
  // sellAvg: yup
  //   .number()
  //   .required()
  //   .transform((value) => toDecimal(value)),
  adjRatio: yup
    .number()
    .required()
    .transform((value) => toDecimal(value)),
  adjClose: yup
    .number()
    .required()
    .transform((value) => toDecimal(value, 10, 0)),
  adjOpen: yup
    .number()
    .required()
    .transform((value) => toDecimal(value, 10, 0)),
  adjHigh: yup
    .number()
    .required()
    .transform((value) => toDecimal(value, 10, 0)),
  adjLow: yup
    .number()
    .required()
    .transform((value) => toDecimal(value, 10, 0)),
  currentForeignRoom: yup.number().required(),
});

function keysToCamelCase(obj: Record<string, any>) {
  const newObj = {};
  Object.keys(obj).forEach((key) => {
    newObj[camelCase(key)] = obj[key];
  });
  return newObj;
}

export function transformAndValidateBscPrice(data: any): any {
  const cData = keysToCamelCase(data);
  bscPriceSchema.validateSync(cData);

  return bscPriceSchema.noUnknown().cast(cData);
}
