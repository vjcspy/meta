import { IsDateYYYYMMDD } from '@modules/core/util/validator/IsDateYYYYMMDD';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class GetTickHistoryRequest {
  @IsNotEmpty()
  @IsString()
  symbol: string;

  @IsNotEmpty()
  @IsDateYYYYMMDD()
  date: string;
}

export class GetTickHistoriesRequest {
  @IsNotEmpty()
  @IsString()
  symbol: string;

  @IsNotEmpty()
  @IsDateYYYYMMDD()
  from: string;

  @IsOptional()
  @IsDateYYYYMMDD()
  to?: string;
}

export class GetTickBackDateRequest {
  @IsNotEmpty()
  @IsString()
  symbol: string;

  @IsNotEmpty()
  @IsDateYYYYMMDD()
  date: string;

  @IsInt()
  @Type(() => Number)
  size: number;
}
