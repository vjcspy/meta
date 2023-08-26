import {
  IsDateString,
  IsDefined,
  IsNotEmptyObject,
  IsObject,
  IsString,
} from 'class-validator';

export class StrategyDto {
  @IsString()
  strategy_name: string;

  @IsDateString()
  from_date: string;

  @IsDateString()
  to_date: string;

  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  strategy_input: any;

  @IsString()
  hash_key: string;
}
