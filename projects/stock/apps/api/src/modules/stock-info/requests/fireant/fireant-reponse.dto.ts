import { Expose, Transform } from 'class-transformer';
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';
import { round } from 'lodash';
import * as moment from 'moment';

export class FireantStockPriceDTO {
  @Expose()
  @IsDate()
  @Transform(({ value }) =>
    value instanceof Date ? value : moment.utc(value).toDate(),
  ) // Chuyển đổi giá trị timestamp thành Date
  date: Date;

  @IsString()
  @Expose()
  symbol: string;

  @IsNumber()
  @Expose()
  @Transform(({ value }) => (value < 1000 ? round(value * 1000, 0) : value))
  priceBasic: number;

  @IsNumber()
  @Expose()
  @Transform(({ value }) => (value < 1000 ? round(value * 1000, 0) : value))
  priceAverage: number;

  @IsNumber()
  @Expose()
  @Transform(({ value }) => (value < 1000 ? round(value * 1000, 0) : value))
  priceHigh: number;

  @IsNumber()
  @Expose()
  @Transform(({ value }) => (value < 1000 ? round(value * 1000, 0) : value))
  priceLow: number;

  @IsNumber()
  @Expose()
  @Transform(({ value }) => (value < 1000 ? round(value * 1000, 0) : value))
  priceOpen: number;

  @IsNumber()
  @Expose()
  @Transform(({ value }) => (value < 1000 ? round(value * 1000, 0) : value))
  priceClose: number;

  @IsNumber()
  @Expose({ name: 'totalVolume' })
  volume: number;

  @IsNumber()
  @Expose({ name: 'totalValue' })
  @Transform(({ value }) => round(value / 10 ** 6, 0))
  value: number;

  @IsNumber()
  @Expose()
  dealVolume: number;

  @IsNumber()
  @IsOptional()
  @Expose()
  currentForeignRoom?: number;

  @IsNumber()
  @Expose()
  buyForeignQuantity: number;

  @IsNumber()
  @Expose()
  sellForeignQuantity: number;

  @Expose()
  @Transform(({ value }) => round(value / 10 ** 6, 0))
  buyForeignValue: number;

  @Expose()
  @Transform(({ value }) => round(value / 10 ** 6, 0))
  sellForeignValue: number;
}
