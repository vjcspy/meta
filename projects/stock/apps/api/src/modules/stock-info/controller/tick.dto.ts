import { IsDateYYYYMMDD } from '@modules/core/util/validator/IsDateYYYYMMDD';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

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

  @IsNotEmpty()
  @IsNumber()
  size: number;
}
