import { Expose, Transform } from 'class-transformer';
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';
import { round } from 'lodash';
import * as moment from 'moment/moment';

export class SimpleStockPriceDTO {
  @Expose()
  @IsDate()
  @Transform(({ value }) =>
    value instanceof Date ? value : moment.unix(Number(value)).toDate(),
  ) // Chuyển đổi giá trị timestamp thành Date
  date: Date;

  @IsString()
  @Expose()
  symbol: string;

  @IsNumber()
  @Expose()
  @Transform(({ value }) => round(value, 0))
  priceHigh: number;

  @IsNumber()
  @Expose()
  @Transform(({ value }) => round(value, 0))
  priceLow: number;

  @IsNumber()
  @Expose()
  @Transform(({ value }) => round(value, 0))
  priceOpen: number;

  @IsNumber()
  @Expose()
  @Transform(({ value }) => round(value, 0))
  priceClose: number;

  @IsNumber()
  @Expose()
  @Transform(({ value }) => round(value, 0))
  netChange: number;

  @IsNumber()
  @Expose()
  @Transform(({ value }) => round(value, 5)) // Chuyển đổi giá trị timestamp thành Date
  pctChange: number;

  @IsNumber()
  @Expose()
  volume: number;

  @IsNumber()
  @IsOptional()
  @Expose({ name: 'cfr' })
  currentForeignRoom?: number;

  @IsNumber()
  @Expose({ name: 'bfq' })
  buyForeignQuantity: number;

  @IsNumber()
  @Expose({ name: 'sfq' })
  sellForeignQuantity: number;

  @Expose({ name: 'bfv' })
  @Transform(({ value }) => round(value / 10 ** 6, 0))
  buyForeignValue: number;

  @Expose({ name: 'sfv' })
  @Transform(({ value }) => round(value / 10 ** 6, 0))
  sellForeignValue: number;

  @Expose({ name: 'fnbsv' })
  @Transform(({ value }) => round(value / 10 ** 6, 0))
  foreignNetBuySellValue: number;
}
