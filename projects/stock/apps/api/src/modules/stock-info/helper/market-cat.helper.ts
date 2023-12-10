import { FlagRepo } from '@modules/core/repo/flag.repo';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MarketCatHelper {
  constructor(private flagRepo: FlagRepo) {}
}
