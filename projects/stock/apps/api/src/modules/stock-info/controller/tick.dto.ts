import { IsDateYYYYMMDD } from '@modules/core/util/validator/IsDateYYYYMMDD';
import { IsNotEmpty, IsString } from 'class-validator';

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

  @IsNotEmpty()
  @IsDateYYYYMMDD()
  to: string;
}
