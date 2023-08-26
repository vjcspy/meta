/* eslint-disable @typescript-eslint/no-use-before-define */
import { Type } from 'class-transformer';
import {
  IsDate,
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
  symbol: string;

  @IsOptional()
  @IsObject()
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

  @Type(() => TradingStrategySchema)
  @IsOptional()
  trading_strategy?: TradingStrategySchema;
}

export class TradingStrategyActionSchema {
  @IsInt()
  @IsOptional()
  id: number;

  @IsString()
  symbol: string;

  @IsInt()
  type: ActionType;

  @IsOptional()
  @IsObject()
  meta?: any;

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
