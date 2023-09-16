import { StockPriceRepo } from '@modules/stock-info/repo/StockPriceRepo';
import { Injectable } from '@nestjs/common';
import * as moment from 'moment/moment';

@Injectable()
export class StockPriceHelper {
  constructor(private readonly stockPriceRepo: StockPriceRepo) {}

  async getHistory(
    symbol: string,
    from: string | Date,
    to: string | Date = moment.utc().toDate(),
  ) {
    let fromDate = from;
    let toDate = to;
    if (typeof fromDate === 'string') {
      fromDate = moment.utc(from).toDate();
    }

    if (typeof toDate === 'string') {
      toDate = moment.utc(to).toDate();
    }

    return this.stockPriceRepo.getHistory(symbol, fromDate, toDate);
  }
}
