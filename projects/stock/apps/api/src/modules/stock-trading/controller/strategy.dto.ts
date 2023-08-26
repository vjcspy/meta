import {
  TradingStrategyActionSchema,
  TradingStrategyProcessSchema,
} from '@modules/stock-trading/model/trading-strategy.model';
import { Expose, Type } from 'class-transformer';
import {
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
  from: Date;

  @Type(() => Date)
  @IsDate()
  @Expose()
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