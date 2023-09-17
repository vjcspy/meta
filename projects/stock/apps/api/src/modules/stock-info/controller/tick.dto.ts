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
