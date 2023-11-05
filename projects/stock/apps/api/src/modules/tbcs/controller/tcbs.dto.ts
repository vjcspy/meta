import { Type } from 'class-transformer';
import {
  IsArray,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';

export class GetTokenRequest {
  @IsNotEmpty()
  @IsString()
  password: string;
}

export class TcbsBaseRequest {
  @IsNotEmpty()
  @IsString()
  tcbsID: string;

  @IsNotEmpty()
  @IsString()
  token: string;
}

class FilterDTO {
  @IsNotEmpty()
  @IsString()
  key: string;

  @IsNotEmpty()
  @IsIn(['=', '>=', '<='])
  operator: string;

  @IsNotEmpty()
  value: any;
}

export class TcbsFilterRequest {
  @IsNotEmpty()
  @IsString()
  tcbsID: string;

  @IsNotEmpty()
  @IsString()
  token: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FilterDTO)
  filters: FilterDTO[];

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  size: number;
}
