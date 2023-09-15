import { Expose, Transform } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateStockTradingAnalysisDto {
  @IsString()
  @Expose()
  @IsNotEmpty()
  symbol: string;

  @IsInt()
  @IsOptional()
  @Expose()
  trade_value_7: number;

  @IsInt()
  @IsOptional()
  @Expose()
  trade_value_14: number;

  @IsInt()
  @IsOptional()
  @Expose()
  trade_value_30: number;
}

export class StockTradingAnalysisResponse {
  @IsString()
  @Expose()
  @IsNotEmpty()
  symbol: string;

  @IsInt()
  @IsOptional()
  @Expose()
  @Transform(({ value }) => Number(value.toString()))
  trade_value_7: number;

  @IsInt()
  @IsOptional()
  @Expose()
  @Transform(({ value }) => Number(value.toString()))
  trade_value_14: number;

  @IsInt()
  @IsOptional()
  @Expose()
  @Transform(({ value }) => Number(value.toString()))
  trade_value_30: number;
}

export class GetStockTradingAnalysisRequest {
  @IsString()
  @Expose()
  @IsNotEmpty()
  @IsOptional()
  symbol: string;
}
