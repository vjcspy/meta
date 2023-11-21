/* eslint-disable @typescript-eslint/no-use-before-define */
import { Expose, Transform, Type } from 'class-transformer';
import {
  IsDate,
  IsDateString,
  IsInt,
  IsJSON,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

export class TradingStrategySchema {
  @IsInt()
  @IsOptional()
  id?: number;

  @IsString()
  name: string;

  @IsJSON()
  input: any;

  @Type(() => Date)
  @IsDate()
  from: Date;

  @Type(() => Date)
  @IsDate()
  to: Date;

  @IsString()
  hash: string;

  @IsJSON()
  @IsOptional()
  meta?: any;

  @IsInt()
  state: number;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  created_at?: Date;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  updated_at?: Date;

  // // Relations
  // @IsOptional()
  // @Type(() => TradingStrategyProcessSchema)
  // trading_strategy_process?: TradingStrategyProcessSchema[];
  //
  // @IsOptional()
  // @Type(() => TradingStrategyActionSchema)
  // trading_strategy_action?: TradingStrategyActionSchema[];
}

export class TradingStrategyProcessSchema {
  @IsInt()
  @IsOptional()
  id?: number;

  @IsString()
  @Expose()
  symbol: string;

  @IsOptional()
  @IsObject()
  @Expose()
  meta?: any;

  @IsInt()
  @Expose()
  state: number;

  @IsDate()
  @IsOptional()
  @Expose()
  @Type(() => Date)
  created_at?: Date;

  @IsDate()
  @IsOptional()
  @Expose()
  @Type(() => Date)
  updated_at?: Date;

  @Type(() => TradingStrategySchema)
  @IsOptional()
  @Expose()
  trading_strategy?: TradingStrategySchema;
}

export class TradingStrategyActionSchema {
  @IsInt()
  @IsOptional()
  id: number;

  @IsString()
  @Expose()
  symbol: string;

  @IsInt()
  @Expose()
  type: ActionType;

  @IsOptional()
  @IsObject()
  @Expose()
  meta?: any;

  @IsDateString()
  @Expose()
  @Transform(({ value }) =>
    value instanceof Date ? value.toISOString().split('T')[0] : value,
  )
  date: string;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  created_at?: Date;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  updated_at?: Date;

  @Type(() => TradingStrategySchema)
  @IsOptional()
  trading_strategy?: TradingStrategySchema;
}

export enum ActionType {
  Buy = 1,
  Sell = 2,
}

export enum TradingStrategyState {
  Pending,
  Processing,
  Complete,
  Error,
  OutScope,
}
