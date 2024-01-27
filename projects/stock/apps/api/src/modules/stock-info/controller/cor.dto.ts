import { Expose, Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import {IsDateYYYYMMDD} from "@modules/core/util/validator/IsDateYYYYMMDD";

export class CorResponse {
  @Expose()
  refId: number;

  @Expose()
  catId: number;

  @Expose()
  code: string;

  @Expose()
  exchange: string;

  @Expose()
  industryName1: string;

  @Expose()
  industryName2: string;

  @Expose()
  industryName3: string;

  @Expose()
  @Transform(({ value }) => Number(value), { toClassOnly: true })
  totalShares: bigint;

  @Expose()
  name: string;

  @Expose()
  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  firstTradeDate: Date;
}

export class GetSymbolInfoQuery {
  @IsNotEmpty()
  @IsString()
  symbol: string;
}

export class SymbolDateDtoQuery {
  @IsNotEmpty()
  @IsString()
  symbol: string;

  @IsNotEmpty()
  @IsDateYYYYMMDD()
  date: string;
}


export class SymbolInfoResponse {
  @Expose({
    name: 'code',
  })
  symbol: number;

  @Expose()
  exchange: string;

  @Expose()
  @Transform(({ value }) => Number(value), { toClassOnly: true })
  totalShares: number;
}
