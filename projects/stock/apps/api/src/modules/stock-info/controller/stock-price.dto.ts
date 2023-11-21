import { IsDateYYYYMMDD } from '@modules/core/util/validator/IsDateYYYYMMDD';
import { Expose, Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { format } from 'date-fns';

export class GetStockPriceHistoryDto {
  @IsNotEmpty()
  @IsString()
  code: string;

  @IsNotEmpty()
  @IsDateYYYYMMDD()
  from: string;

  @IsOptional()
  @IsDateYYYYMMDD()
  to?: string;
}

export class StockPriceHistoryResponse {
  @Expose()
  @Transform(({ value }) => format(value, 'yyyy-MM-dd'))
  date: Date;

  // @Expose({
  //   name: 'symbol',
  // })
  // code: string;

  @Expose({
    name: 'adjHigh',
  })
  high: number;

  @Expose({
    name: 'adjLow',
  })
  low: number;

  @Expose({
    name: 'adjClose',
  })
  close: number;

  @Expose({
    name: 'adjOpen',
  })
  open: number;

  // Gia chua dieu chinh, su dung trong 1 so truong hop phan tich
  @Expose({
    name: 'priceHigh',
  })
  rHigh: number;

  @Expose({
    name: 'priceLow',
  })
  rLow: number;

  @Expose({
    name: 'priceClose',
  })
  rClose: number;

  @Expose({
    name: 'priceOpen',
  })
  rOpen: number;

  @Expose({})
  @Transform(({ value }) => Number(value.toString()))
  volume: number;

  @Expose({
    name: 'totalTrade',
  })
  @Transform(({ value }) => Number(value.toString()))
  totalTrade: number;

  @Expose({
    name: 'totalValue',
  })
  @Transform(({ value }) => Number(value.toString()))
  value: number;

  @Expose({
    name: 'buyCount',
  })
  buyCount: number;

  @Expose({})
  @Transform(({ value }) => Number(value.toString()))
  buyQuantity: number;

  @Expose({
    name: 'sellCount',
  })
  sellCount: number;

  @Expose({})
  @Transform(({ value }) => Number(value.toString()))
  sellQuantity: number;

  @Expose({
    name: 'buyForeignValue',
  })
  @Transform(({ value }) => Number(value.toString()))
  fBuyVal: number;

  @Expose({
    name: 'buyForeignQuantity',
  })
  @Transform(({ value }) => Number(value.toString()))
  fBuyQty: number;

  @Expose({
    name: 'sellForeignValue',
  })
  @Transform(({ value }) => Number(value.toString()))
  fSellVal: number;

  @Expose({
    name: 'sellForeignQuantity',
  })
  @Transform(({ value }) => Number(value.toString()))
  fSellQty: number;
}
