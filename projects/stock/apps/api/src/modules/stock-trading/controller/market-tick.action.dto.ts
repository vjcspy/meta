import { IsDateYYYYMMDD } from '@modules/core/util/validator/IsDateYYYYMMDD';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetMarketTickActionRequest {
  @IsNotEmpty()
  @IsString()
  symbol: string;

  @IsNotEmpty()
  @IsDateYYYYMMDD()
  date: string;
}
