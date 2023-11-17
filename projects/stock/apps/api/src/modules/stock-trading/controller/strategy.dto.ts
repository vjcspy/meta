import {
  TradingStrategyActionSchema,
  TradingStrategyProcessSchema,
} from '@modules/stock-trading/model/trading-strategy.model';
import { Expose, Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsDateString,
  IsDefined,
  IsInt,
  IsJSON,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class StrategyDto {
  @IsString()
  strategy_name: string;

  @IsDateString()
  from_date: string;

  @IsDateString()
  to_date: string;

  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  strategy_input: any;

  @IsObject()
  @IsOptional()
  meta: any;

  @IsString()
  hash_key: string;
}

export class StrategyProcessDto {
  @IsString()
  @IsNotEmpty()
  hash: string;

  @IsString()
  @IsNotEmpty()
  symbol: string;
}

export class TradingStrategyResponse {
  @IsInt()
  @IsOptional()
  id?: number;

  @IsString()
  @Expose()
  name: string;

  @IsJSON()
  @Expose()
  input: any;

  @Type(() => Date)
  @IsDate()
  @Expose()
  @Transform(({ value }) =>
    value instanceof Date ? value.toISOString().split('T')[0] : value,
  )
  from: Date;

  @Type(() => Date)
  @IsDate()
  @Expose()
  @Transform(({ value }) =>
    value instanceof Date ? value.toISOString().split('T')[0] : value,
  )
  to: Date;

  @IsString()
  @Expose()
  hash: string;

  @IsJSON()
  @IsOptional()
  @Expose()
  meta?: any;

  @IsInt()
  @Expose()
  state: number;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  @Expose()
  created_at?: Date;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  @Expose()
  updated_at?: Date;

  // Relations
  @IsOptional()
  @Expose()
  @Type(() => TradingStrategyProcessSchema)
  trading_strategy_process?: TradingStrategyProcessSchema[];

  @IsOptional()
  @Type(() => TradingStrategyActionSchema)
  @Expose()
  trading_strategy_action?: TradingStrategyActionSchema[];
}

export class BulkActionItem {
  @IsNotEmpty()
  @IsDateString()
  date: string;

  @IsNotEmpty()
  @IsInt()
  price: number;
}

export class BulkSubmitActionDto {
  @IsString()
  @Expose()
  hash: string;

  @IsString()
  @IsNotEmpty()
  symbol: string;

  @IsArray()
  // @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => BulkActionItem)
  buy: BulkActionItem[];
}
