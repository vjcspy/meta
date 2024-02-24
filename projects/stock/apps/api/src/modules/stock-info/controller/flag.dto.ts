import { IsNotEmpty, IsString } from 'class-validator';

export class FlagDto {
  @IsNotEmpty()
  @IsString()
  key: string;

  @IsString()
  value: string;
}
