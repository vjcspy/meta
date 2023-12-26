import { prisma } from '@modules/core/util/prisma';
import { MarketCatHelper } from '@modules/stock-info/helper/market-cat.helper';
import { TickHelper } from '@modules/stock-info/helper/tick.helper';
import type { TickRecord } from '@modules/stock-info/stock-info.type';
import { MarketCatValue } from '@modules/stock-info/values/market-cat.value';
import { LiveRequest } from '@modules/stock-trading/requests/live/live.request';
import { XLogger } from '@nest/base/dist';
import { Injectable } from '@nestjs/common';
import { find, forEach, round, values } from 'lodash';
import * as moment from 'moment';

export interface SymbolTickDate {
  date: string;
  symbol: string;
  meta: TickRecord[];
}

export interface SymbolTickAnalyzeRecord {
  ts: number;
  shark_buy_count: number;
  shark_sell_count: number;
  sheep_buy_count: number;
  sheep_sell_count: number;

  shark_buy_value: number;
  shark_sell_value: number;
  sheep_buy_value: number;
  sheep_sell_value: number;

  buy_count: number;
  sell_count: number;
  buy_value: number;
  sell_value: number;
}

@Injectable()
export class TickActionAnalyzeHelper {
  private readonly logger = new XLogger(TickActionAnalyzeHelper.name);

  static SHARK_TRADE_VALUE = 400;

  static NEED_FETCH_DATA = true;

  constructor(
    private tickHelper: TickHelper,
    private marketCatHelper: MarketCatHelper,
    private liveRequest: LiveRequest,
  ) {}

  private isFetchDataFromLive() {
    return TickActionAnalyzeHelper.NEED_FETCH_DATA;
  }

  async runForDate(date: string) {
    this.logger.info(`Start analyzing tick action data for date ${date}`);

    const defaultCate = await this.getDefaultCat();

    if (
      !Array.isArray(defaultCate?.symbols) ||
      defaultCate.symbols.length === 0
    ) {
      this.logger.warn(`Please check default category`);
    }

    this.logger.info(`Start load ticks for date ${date}`);
    const ticks = await this.loadCategoryTickDate(defaultCate.symbols, date);

    if (!ticks || ticks.length === 0) {
      this.logger.warn(`Not found ticks for date ${date}`);
    }

    await this.marketTickActionAnalyze(ticks);
  }

  private async getDefaultCat() {
    if (this.isFetchDataFromLive()) {
      this.logger.info('Request default category from live');
      const list = await this.liveRequest.getCategoryList();
      return find(
        list,
        (r: any) => r.key === MarketCatValue.DEFAULT_MARKET_CAT_KEY,
      );
    }
    return this.marketCatHelper.getDefaultCat();
  }

  private async loadCategoryTickDate(symbols: string[], date: string) {
    if (this.isFetchDataFromLive()) {
      try {
        return await Promise.all(
          symbols.map((symbol) =>
            this.liveRequest.getTickHistory(symbol, date),
          ),
        );
      } catch (e) {
        this.logger.error('Failed loadCategoryTickDate from live', e);

        return undefined;
      }
    } else {
      const data = [];

      for (let i = 0; i < symbols.length; i++) {
        const symbolTickDate = await this.tickHelper.getHistory(
          symbols[i],
          date,
        );
        data.push(symbolTickDate);
      }

      return data;
    }
  }

  private async marketTickActionAnalyze(marketTickDate: SymbolTickDate[]) {
    this.logger.info('Starting create market tick action');

    const marketGroupedByTs: Record<
      number,
      SymbolTickAnalyzeRecord & { symbols: any[] }
    > = {};

    forEach(marketTickDate, (symbolTickDate) => {
      const symbolTickInfo = this.symbolTickActionAnalyze(symbolTickDate);

      forEach(symbolTickInfo, (value) => {
        const { ts } = value;
        if (!marketGroupedByTs.hasOwnProperty(ts)) {
          marketGroupedByTs[ts] = {
            ts,
            shark_buy_count: 0,
            shark_sell_count: 0,
            sheep_buy_count: 0,
            sheep_sell_count: 0,

            shark_buy_value: 0,
            shark_sell_value: 0,
            sheep_buy_value: 0,
            sheep_sell_value: 0,

            buy_count: 0,
            sell_count: 0,
            buy_value: 0,
            sell_value: 0,

            symbols: [],
          };
        }
        const transactions = this.formatRecord(value);
        // eslint-disable-next-line no-restricted-syntax,guard-for-in
        for (const key in transactions) {
          marketGroupedByTs[ts][key] += transactions[key];
        }

        marketGroupedByTs[ts].symbols.push({
          symbol: symbolTickDate.symbol,
          ts,
          ...transactions,
        });
      });
    });

    const marketData = values(marketGroupedByTs);

    try {
      await prisma.$transaction(
        marketData.map((record) =>
          prisma.marketTickActionInfo.create({
            data: {
              ts: record.ts,

              shark_buy_count: record.shark_buy_count,
              shark_sell_count: record.shark_sell_count,
              sheep_buy_count: record.sheep_buy_count,
              sheep_sell_count: record.sheep_sell_count,

              shark_buy_value: record.shark_buy_value,
              shark_sell_value: record.shark_sell_value,
              sheep_buy_value: record.sheep_buy_value,
              sheep_sell_value: record.sheep_sell_value,

              buy_count: record.buy_count,
              sell_count: record.sell_count,
              buy_value: record.buy_value,
              sell_value: record.sell_value,

              market_symbol_tick_actions: {
                create: record.symbols.map((symbol) => ({
                  symbol: symbol.symbol,

                  shark_buy_count: symbol.shark_buy_count,
                  shark_sell_count: symbol.shark_sell_count,
                  sheep_buy_count: symbol.sheep_buy_count,
                  sheep_sell_count: symbol.sheep_sell_count,

                  shark_buy_value: symbol.shark_buy_value,
                  shark_sell_value: symbol.shark_sell_value,
                  sheep_buy_value: symbol.sheep_buy_value,
                  sheep_sell_value: symbol.sheep_sell_value,

                  buy_count: symbol.buy_count,
                  sell_count: symbol.sell_count,
                  buy_value: symbol.buy_val,
                  sell_value: symbol.sell_val,
                })),
              },
            },
          }),
        ),
      );
    } catch (e) {
      this.logger.error(`Failed create market tick action data`, e);
    }

    this.logger.info('Save market tick action successfully');
  }

  private formatRecord(value: SymbolTickAnalyzeRecord) {
    return {
      shark_buy_count: value.shark_buy_count,
      shark_sell_count: value.shark_sell_count,
      sheep_buy_count: value.sheep_buy_count,
      sheep_sell_count: value.sheep_sell_count,

      shark_buy_value: round(value.shark_buy_value / 10 ** 6),
      shark_sell_value: round(value.shark_sell_value / 10 ** 6),
      sheep_buy_value: round(value.sheep_buy_value / 10 ** 6),
      sheep_sell_value: round(value.sheep_sell_value / 10 ** 6),

      buy_count: value.buy_count,
      sell_count: value.sell_count,
      buy_val: round(value.buy_value / 10 ** 6),
      sell_val: round(value.sell_value / 10 ** 6),
    };
  }

  private symbolTickActionAnalyze(tickDate: SymbolTickDate) {
    const groupedByMin: Record<number, SymbolTickAnalyzeRecord> = {};

    const date = moment(tickDate.date);

    forEach(tickDate.meta, (tick) => {
      const timeString = tick.time;
      date.set({
        hour: moment(timeString, 'HH:mm:ss').hour(),
        minute: moment(timeString, 'HH:mm:ss').minute(),
        second: 0,
      });

      const ts = date.unix();

      if (!groupedByMin.hasOwnProperty(ts)) {
        groupedByMin[ts] = {
          ts,
          shark_buy_count: 0,
          shark_sell_count: 0,
          sheep_buy_count: 0,
          sheep_sell_count: 0,

          shark_buy_value: 0,
          shark_sell_value: 0,
          sheep_buy_value: 0,
          sheep_sell_value: 0,

          buy_count: 0,
          sell_count: 0,
          buy_value: 0,
          sell_value: 0,
        };
      }

      if (tick.a === 'B') {
        const tickInfo = this.getTickInfo(tick);
        groupedByMin[ts].buy_count += 1;
        groupedByMin[ts].buy_value += tickInfo.val;
        if (tickInfo.isTickShark) {
          groupedByMin[ts].shark_buy_count += 1;
          groupedByMin[ts].shark_buy_value += tickInfo.val;
        } else {
          groupedByMin[ts].sheep_buy_count += 1;
          groupedByMin[ts].sheep_buy_value += tickInfo.val;
        }
      } else if (tick.a === 'S') {
        const tickInfo = this.getTickInfo(tick);
        groupedByMin[ts].sell_count += 1;
        groupedByMin[ts].sell_value += tickInfo.val;

        if (tickInfo.isTickShark) {
          groupedByMin[ts].shark_sell_count += 1;
          groupedByMin[ts].shark_sell_value += tickInfo.val;
        } else {
          groupedByMin[ts].sheep_sell_count += 1;
          groupedByMin[ts].sheep_sell_value += tickInfo.val;
        }
      }
    });

    return groupedByMin;
  }

  private getTickInfo(tick: TickRecord) {
    const val = tick.vol * tick.p;
    let isTickShark = false;
    if (val > TickActionAnalyzeHelper.SHARK_TRADE_VALUE * 10 ** 6) {
      isTickShark = true;
    }

    return {
      vol: tick.vol,
      val,
      isTickShark,
      p: tick.p,
    };
  }
}
