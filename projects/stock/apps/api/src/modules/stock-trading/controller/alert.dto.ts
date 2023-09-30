import { Expose } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AlertDto {
  @IsInt()
  @Expose()
  @IsOptional()
  id: string;

  @IsString()
  @Expose()
  @IsNotEmpty()
  name: string;

  @IsString()
  @Expose()
  @IsOptional()
  symbol: string;

  @IsInt()
  @Expose()
  @IsNotEmpty()
  state: number;

  @IsString()
  @Expose()
  @IsNotEmpty()
  conditions: string;
}
