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

  @IsInt()
  @IsOptional()
  @Expose()
  l16_hullma_trend: number;

  @IsInt()
  @IsOptional()
  @Expose()
  l16_hullma_day_in_trend: number;

  @IsInt()
  @IsOptional()
  @Expose()
  l16_hullma_highest_diff_percent: number;

  @IsInt()
  @IsOptional()
  @Expose()
  cur_gap_percent: number;

  @IsInt()
  @IsOptional()
  @Expose()
  cap: number;
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

  @IsInt()
  @IsOptional()
  @Expose()
  @Transform(({ value }) => Number(value.toString()))
  l16_hullma_trend: number;

  @IsInt()
  @IsOptional()
  @Expose()
  @Transform(({ value }) => Number(value.toString()))
  l16_hullma_day_in_trend: number;

  @IsInt()
  @IsOptional()
  @Expose()
  @Transform(({ value }) => Number(value.toString()))
  l16_hullma_highest_diff_percent: number;

  @IsInt()
  @IsOptional()
  @Expose()
  @Transform(({ value }) => Number(value.toString()))
  cur_gap_percent: number;

  @IsInt()
  @IsOptional()
  @Expose()
  @Transform(({ value }) => Number(value.toString()))
  cap: number;
}

export class GetStockTradingAnalysisRequest {
  @IsString()
  @Expose()
  @IsNotEmpty()
  @IsOptional()
  symbol: string;
}
