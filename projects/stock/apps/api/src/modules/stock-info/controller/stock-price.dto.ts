import { Expose, Transform } from 'class-transformer';
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { format } from 'date-fns';

export class GetStockPriceHistoryDto {
  @IsNotEmpty()
  @IsString()
  code: string;

  @IsNotEmpty()
  @IsDateString()
  from: string;

  @IsOptional()
  @IsDateString()
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
    name: 'priceHigh',
  })
  high: number;

  @Expose({
    name: 'priceLow',
  })
  low: number;

  @Expose({
    name: 'priceClose',
  })
  close: number;

  @Expose({
    name: 'priceOpen',
  })
  open: number;

  @Expose({})
  volume: number;

  @Expose({
    name: 'totalTrade',
  })
  @Transform(({ value }) => Number(value.toString()))
  trade: number;

  @Expose({
    name: 'totalValue',
  })
  @Transform(({ value }) => Number(value.toString()))
  value: number;

  @Expose({
    name: 'buyCount',
  })
  buy: number;

  @Expose({})
  buyQuantity: number;

  @Expose({
    name: 'sellCount',
  })
  sell: number;

  @Expose({})
  sellQuantity: number;
}
