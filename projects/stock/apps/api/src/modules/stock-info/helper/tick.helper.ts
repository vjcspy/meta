/* eslint-disable no-param-reassign */
import { getCurrentDate } from '@modules/core/util/getCurrentDate';
import { prisma } from '@modules/core/util/prisma';
import { StockPriceRepo } from '@modules/stock-info/repo/StockPriceRepo';
import type { TickRecord } from '@modules/stock-info/stock-info.type';
import { XLogger } from '@nest/base/dist';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { find, forEach, map, sortBy, uniqBy } from 'lodash';
import * as moment from 'moment';

@Injectable()
export class TickHelper {
  private readonly logger = new XLogger(TickHelper.name);

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
      // @ts-ignore
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
          // @ts-ignore
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

  async getHistoriesV2(
    symbol: string,
    from: string,
    to: string = getCurrentDate(),
  ) {
    const fromDate = moment.utc(from).toDate();
    const toDate = moment.utc(to).toDate();

    const histories = await prisma.stockInfoTicks.findMany({
      where: {
        symbol,
        date: {
          lte: toDate,
          gte: fromDate,
        },
      },
    });

    return this.mapTickHistories(histories);
  }

  async getTickBackDate(symbol: string, date: string, size: number) {
    const toDate = moment.utc(date).toDate();

    const histories = await prisma.stockInfoTicks.findMany({
      where: {
        symbol,
        date: {
          lte: toDate,
        },
      },
      orderBy: {
        date: 'desc',
      },
      take: size,
    });
    if (histories.length !== size) {
      const error = new BadRequestException(
        `Không đủ dữ liệu tick cho symbol ${symbol}`,
      );
      this.logger.error(`Không đủ dữ liệu tick cho symbol ${symbol}`, error);
      throw error;
    }
    return this.mapTickHistories(histories);
  }

  private mapTickHistories(histories) {
    if (histories.length > 0) {
      histories = map(histories, (h) => {
        if (Array.isArray(h?.meta)) {
          h.meta = map(h.meta, (_t) => this.mapTickData(_t)) as any;
        } else {
          h.meta = [];
        }

        return h;
      });
      histories = uniqBy(histories, (h: any) => h.date.getTime());
      histories = sortBy(histories, (h: any) => h.date.getTime());

      return histories;
    }
    return [];
  }

  private mapTickData(tick: any) {
    if (Array.isArray(tick) && tick.length === 4) {
      const _tickData: TickRecord = {
        time: moment.unix(tick[0]).format('HH:mm:ss'),
        vol: tick[1],
        // p: Math.round(Number(tick[2]) / 100) * 100,
        p: tick[2],
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
