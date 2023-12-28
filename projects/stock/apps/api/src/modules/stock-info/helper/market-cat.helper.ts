import { FlagRepo } from '@modules/core/repo/flag.repo';
import { MarketCatValue } from '@modules/stock-info/values/market-cat.value';
import { Injectable } from '@nestjs/common';
import { find } from 'lodash';

@Injectable()
export class MarketCatHelper {
  constructor(private flagRepo: FlagRepo) {}

  async getDefaultCat() {
    const flag = await this.flagRepo.findByKey(
      MarketCatValue.MARKET_CAT_FLAG_KEY,
    );
    let defaultCat: any;
    try {
      if (flag) {
        defaultCat = find(
          JSON.parse(flag.value),
          (r: any) => r.key === MarketCatValue.DEFAULT_MARKET_CAT_KEY,
        );
      }
    } catch (e) {
      // swallow error
    }

    return defaultCat;
  }
}
