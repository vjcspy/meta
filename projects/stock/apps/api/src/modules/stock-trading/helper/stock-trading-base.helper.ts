import { StockPriceHelper } from '@modules/stock-info/helper/stock-price.helper';
import { StockInfoValue } from '@modules/stock-info/values/stock-info.value';
import { Injectable } from '@nestjs/common';

@Injectable()
export class StockTradingBaseHelper {
  private static _CACHE_INDEX = {};

  constructor(private priceHelper: StockPriceHelper) {}

  async isHasVNIndexForDate(date: string) {
    if (StockTradingBaseHelper._CACHE_INDEX.hasOwnProperty(date)) {
      return StockTradingBaseHelper._CACHE_INDEX[date];
    }

    const prices = await this.priceHelper.getSimpleHistory(
      StockInfoValue.VNINDEX_CODE,
      date,
      date,
    );
    StockTradingBaseHelper._CACHE_INDEX[date] = prices.length === 1;

    return StockTradingBaseHelper._CACHE_INDEX[date];
  }
}
