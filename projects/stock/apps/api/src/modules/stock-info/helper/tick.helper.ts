/* eslint-disable no-param-reassign */
import { prisma } from '@modules/core/util/prisma';
import { StockPriceRepo } from '@modules/stock-info/repo/StockPriceRepo';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { find, forEach, map, sortBy, uniqBy } from 'lodash';
import * as moment from 'moment';

@Injectable()
export class TickHelper {
  constructor(private readonly stockPriceRepo: StockPriceRepo) {}

  async getHistory(symbol: string, date: string | Date) {
    if (typeof date === 'string') {
      date = moment.utc(date).toDate();
    }

    const data = await prisma.stockInfoTicks.findFirst({
      where: {
        date,
        symbol,
      },
    });

    if (Array.isArray(data?.meta)) {
      data.meta = map(data.meta, (_t: any) => this.mapTickData(_t));
    }

    return data ?? {};
  }

  async getHistories(symbol: string, from: string, to: string) {
    const fromDate = moment.utc(from).toDate();
    const toDate = moment.utc(to).toDate();

    // Maybe we have duplicated date when migrating, so will refer date from prices history
    const prices = await this.stockPriceRepo.getHistory(
      symbol,
      fromDate,
      toDate,
    );
    const dates = [];
    if (prices.length > 0) {
      forEach(prices, (p) => {
        dates.push(moment.utc(p.date).toDate());
      });
    } else {
      return [];
    }

    let histories = await prisma.stockInfoTicks.findMany({
      where: {
        symbol,
        date: {
          in: dates,
        },
      },
    });

    if (histories.length > 0) {
      histories = map(histories, (h) => {
        if (Array.isArray(h?.meta)) {
          h.meta = map(h.meta, (_t) => this.mapTickData(_t));
        } else {
          h.meta = [];
        }
        const price = find(prices, (p) =>
          moment(p.date).isSame(moment(h.date), 'day'),
        );

        h = Object.assign(h, {
          close: price.adjClose,
          open: price.adjOpen,
          low: price.adjLow,
          high: price.adjHigh,
          totalTrade: Number(price.totalValue),
        });

        return h;
      });

      histories = sortBy(histories, (h) => h.date.getTime());

      return histories;
    }
    return [];
  }

  async getHistoriesV2(symbol: string, from: string, to: string) {
    const fromDate = moment.utc(from).toDate();
    const toDate = moment.utc(to).toDate();

    let histories = await prisma.stockInfoTicks.findMany({
      where: {
        symbol,
        date: {
          lte: toDate,
          gte: fromDate,
        },
      },
    });

    if (histories.length > 0) {
      histories = map(histories, (h) => {
        if (Array.isArray(h?.meta)) {
          h.meta = map(h.meta, (_t) => this.mapTickData(_t));
        } else {
          h.meta = [];
        }

        return h;
      });
      histories = uniqBy(histories, 'date');
      histories = sortBy(histories, (h) => h.date.getTime());

      return histories;
    }
    return [];
  }

  private mapTickData(tick: any) {
    if (Array.isArray(tick) && tick.length === 4) {
      const _tickData: any = {
        time: moment.unix(tick[0]).format('HH:mm:ss'),
        vol: tick[1],
        p: Math.round(Number(tick[2]) / 100) * 100,
        a: tick[3],
      };

      return _tickData;
    }

    throw new HttpException(
      'Tick data in db not valid',
      HttpStatus.BAD_REQUEST,
    );
  }
}
