import { Expose } from 'class-transformer';
import { IsInt, IsNumber, IsOptional, IsString } from 'class-validator';

export class StrategyHistoryTestResultDTO {
  @Expose()
  @IsOptional()
  id: number;

  @Expose()
  @IsString()
  type: string;

  @Expose()
  @IsString()
  start: string;

  @Expose()
  @IsString()
  end: string;

  @Expose()
  @IsInt()
  pass_count: number;

  @Expose()
  @IsInt()
  fail_count: number;

  @Expose()
  @IsInt()
  unknown_count: number;

  @Expose()
  @IsNumber()
  profit: number;

  @Expose()
  @IsString()
  data: string;

  @Expose()
  @IsString()
  @IsOptional()
  created_at: string;
}
