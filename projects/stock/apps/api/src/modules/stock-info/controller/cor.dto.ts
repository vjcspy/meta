import { Expose, Transform } from 'class-transformer';

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
