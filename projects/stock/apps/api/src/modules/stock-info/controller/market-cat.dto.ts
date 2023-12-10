import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class MarketCategory {
  @IsNotEmpty()
  @IsString()
  key: string;

  @IsString()
  name: string;

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  symbols: string[];
}
