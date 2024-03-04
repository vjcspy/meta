import { Expose } from 'class-transformer';
import { IsInt, IsNumber, IsOptional, IsString } from 'class-validator';

export class StrategyHistoryTestResultDTO {
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
  pass: number;

  @Expose()
  @IsInt()
  fail: number;

  @Expose()
  @IsInt()
  unknown: number;

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
