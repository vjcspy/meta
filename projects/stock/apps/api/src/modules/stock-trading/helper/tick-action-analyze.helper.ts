import { prisma } from '@modules/core/util/prisma';
import { MarketCatHelper } from '@modules/stock-info/helper/market-cat.helper';
import { StockPriceHelper } from '@modules/stock-info/helper/stock-price.helper';
import { TickHelper } from '@modules/stock-info/helper/tick.helper';
import type { TickRecord } from '@modules/stock-info/stock-info.type';
import { MarketCatValue } from '@modules/stock-info/values/market-cat.value';
import { StockInfoValue } from '@modules/stock-info/values/stock-info.value';
import { LiveRequest } from '@modules/stock-trading/requests/live/live.request';
import { AppError, XLogger } from '@nest/base';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { find, forEach, round, values } from 'lodash';
import * as moment from 'moment';

export interface SymbolTickDate {
  date: string;
  symbol: string;
  meta: TickRecord[];
}

export interface SymbolTickAnalyzeRecord {
  ts: number;
  price?: number;
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

/*
 * Generate tick action for market and symbol
 * Table: MarketTickSymbolActionInfo, MarketTickActionInfo
 * */
@Injectable()
export class TickActionAnalyzeHelper {
  private readonly logger = new XLogger(TickActionAnalyzeHelper.name);

  static SHARK_TRADE_VALUE = 400;

  static HISTORY_RECORDS = 1000;

  static NEED_FETCH_DATA = true;

  private _defaultCat: any;

  constructor(
    private tickHelper: TickHelper,
    private marketCatHelper: MarketCatHelper,
    private liveRequest: LiveRequest,
    private priceHelper: StockPriceHelper,
  ) {}

  private isFetchDataFromLive() {
    return TickActionAnalyzeHelper.NEED_FETCH_DATA;
  }

  async getHistoryDataForDate(symbol: string, date: string) {
    this.logger.info(`getHistoryDataForDate symbol ${symbol} date ${date}`);
    let tickActionData;
    if (symbol === StockInfoValue.VNINDEX_CODE) {
      tickActionData = await prisma.marketTickActionInfo.findMany({
        where: {
          ts: {
            gt: moment
              .utc(date)
              .set({
                hour: 0,
              })
              .unix(),
            lt: moment
              .utc(date)
              .add(1, 'day')
              .set({
                hour: 0,
              })
              .unix(),
          },
        },
        orderBy: {
          ts: 'desc',
        },
      });
    } else {
      tickActionData = await prisma.marketTickSymbolActionInfo.findMany({
        where: {
          symbol,
          ts: {
            gt: moment
              .utc(date)
              .set({
                hour: 0,
              })
              .unix(),
            lt: moment
              .utc(date)
              .add(1, 'day')
              .set({
                hour: 0,
              })
              .unix(),
          },
        },
        orderBy: {
          ts: 'desc',
        },
      });
    }

    if (!tickActionData) {
      throw new HttpException(
        `Not found tick action data for symbol ${symbol} date ${date}`,
        HttpStatus.NOT_FOUND,
      );
    }

    /* Lich su de so sanh la ngay co du lieu lich su gan nha */
    const tickHistoryAvgData =
      await prisma.marketTickActionHistoryAnalyze.findFirst({
        where: {
          symbol,
          date: {
            lt: moment.utc(date).toDate(),
          },
        },
        orderBy: {
          date: 'desc',
        },
      });

    if (!tickHistoryAvgData) {
      throw new HttpException(
        `Not found analyze history data for symbol ${symbol} date ${date}`,
        HttpStatus.NOT_FOUND,
      );
    }

    return {
      tickActionData,
      tickHistoryAvgData,
    };
  }

  /**
   * Generate tick every minute for default category and every symbols
   *
   * @param date
   * @returns {Promise<void>}
   */
  async runForDate(date: string): Promise<void> {
    this.logger.info(`Start analyzing tick action data for date ${date}`);

    const defaultCate = await this.getDefaultCat();

    if (
      !Array.isArray(defaultCate?.symbols) ||
      defaultCate.symbols.length === 0
    ) {
      throw new Error(`Please check default category`);
    }

    this.logger.info(`Start load ticks for date ${date}`);
    const ticks = await this.loadCategoryTickDate(defaultCate.symbols, date);

    if (!ticks || ticks.length === 0) {
      throw new Error(`Not found ticks for date ${date}`);
    }

    await this.marketTickActionAnalyze(ticks, date);
  }

  /**
   * Job chạy cuối ngày để tính toán dữ liệu trung bình cho ngày hôm đó,
   * khi cần so sánh 1 ngày với lịch sử thì lấy ngày lịch sử gần nhất
   *
   * @param date
   * @returns {Promise<void>}
   */
  async analyzeHistoryDataForDate(date: string) {
    // re-check de dam bao co VNINDEX price cho ngay can tao
    const prices = await this.priceHelper.getSimpleHistory(
      StockInfoValue.VNINDEX_CODE,
      date,
      date,
    );

    if (prices.length !== 1) {
      const error = new AppError(
        `Error when analyzeHistoryDataForDate. Invalid history price for ${StockInfoValue.VNINDEX_CODE} at date ${date}`,
      );
      this.logger.error(error.message, error);

      throw error;
    }

    // remove all record before run
    this.logger.info(
      `Will remove all record in Market History Analyze for date ${date}`,
    );

    await prisma.marketTickActionHistoryAnalyze.deleteMany({
      where: {
        date: moment.utc(date).toDate(),
      },
    });

    // Phai dam bao du 1500 record tinh tu ngay hien tai
    // Job se chay vao DAU NGAY GIAO DICH, nen cung can dam bao ngay do co giao dich (thuc chat la minh se di tu price history cuar VNINDEX)

    // this.logger.info(`Analyze market history data for date ${date}`);
    //
    // // check existed record in this day
    // this.logger.info(`Check if has record for current date ${date}`);
    // const isHasRecordCurrentDate = await prisma.marketTickActionInfo.findFirst({
    //   where: {
    //     ts: {
    //       gt: moment
    //         .utc(date)
    //         .set({
    //           hour: 0,
    //         })
    //         .unix(),
    //       lt: moment
    //         .utc(date)
    //         .add(1, 'day')
    //         .set({
    //           hour: 0,
    //         })
    //         .unix(),
    //     },
    //   },
    // });
    //
    // if (!isHasRecordCurrentDate?.ts) {
    //   const error = new AppError(
    //     'Current day not have any records, please run analyze first',
    //   );
    //   this.logger.error(error.message, error);
    //   error.setNoRetry();
    //   throw error;
    // }

    const defaultCat = await this.getDefaultCat();

    // check if has enough history records
    this.logger.info(
      `Will get ${TickActionAnalyzeHelper.HISTORY_RECORDS} records history for market`,
    );

    // TODO: nếu chỉ fix con số để lấy N rows nào đó thì có trường hợp lấy từ 1 khoảng thời gian trong ngày nào đó,
    //  nó không phản ảnh cả ngày thành ra có thể có sai sót khi tính giá trung bình( cuối phiên giao dịch nhiều hơn đầu phiên)
    const histories = await prisma.marketTickActionInfo.findMany({
      where: {
        ts: {
          lt: moment
            .utc(date)
            .set({
              hour: 23,
              minute: 59,
            })
            .unix(),
        },
      },
      take: TickActionAnalyzeHelper.HISTORY_RECORDS,
      orderBy: {
        ts: 'desc',
      },
    });

    if (histories.length !== TickActionAnalyzeHelper.HISTORY_RECORDS) {
      const error = new AppError(
        `Not have enough ${TickActionAnalyzeHelper.HISTORY_RECORDS} history records (${histories.length})`,
      );
      error.setNoRetry();
      this.logger.error(error.message, error);
      throw error;
    }

    const marketAnalysis = {
      symbol: StockInfoValue.VNINDEX_CODE,
      date: moment.utc(date).toDate(),
      ...this.calculateAvgHistoryData(histories),
    };

    this.logger.info(`Will calculate history for symbols for date ${date}`);
    const symbolData: any[] = await Promise.all(
      defaultCat.symbols.map((symbol: string) =>
        this.calculateHistoryAvgForSymbol(symbol, date),
      ),
    );
    symbolData.push(marketAnalysis);
    try {
      this.logger.info(
        `Start save data market tick action history analyze to DB for date ${date}`,
      );
      await prisma.$transaction(
        symbolData.map((data) =>
          prisma.marketTickActionHistoryAnalyze.create({
            data,
          }),
        ),
      );

      this.logger.info(
        `Successfully analyze market tick history AVG data for date ${date}`,
      );
    } catch (e) {
      this.logger.error(
        `Failed create tick action history analyze for date ${date}`,
        e,
      );
    }
  }

  private async calculateHistoryAvgForSymbol(symbol: string, date: string) {
    const histories = await prisma.marketTickSymbolActionInfo.findMany({
      where: {
        symbol,
        ts: {
          lt: moment
            .utc(date)
            .subtract(1, 'day')
            .set({
              hour: 23,
              minute: 59,
            })
            .unix(),
        },
      },
      take: TickActionAnalyzeHelper.HISTORY_RECORDS,
      orderBy: {
        ts: 'desc',
      },
    });

    if (histories.length < TickActionAnalyzeHelper.HISTORY_RECORDS - 400) {
      // Do 1 số cổ phiếu giao dịch ít nên 1 ngày không đủ 200 records
      const error = new AppError(
        `Not have enough ${TickActionAnalyzeHelper.HISTORY_RECORDS} history records for symbol ${symbol} at date ${date} (${histories.length})`,
      );
      error.setNoRetry();
      this.logger.error(error.message, error);
      throw error;
    }

    return {
      symbol,
      date: moment.utc(date).toDate(),
      ...this.calculateAvgHistoryData(histories),
    };
  }

  private calculateAvgHistoryData(histories: SymbolTickAnalyzeRecord[]) {
    const sum = {
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
    forEach(histories, (h) => {
      forEach(sum, (_, key) => {
        sum[key] += h[key];
      });
    });
    const avg: any = {};
    forEach(sum, (_, key) => {
      avg[`avg_${key}`] = round(sum[key] / histories.length);
    });

    return avg;
  }

  async getDefaultCat() {
    if (this._defaultCat) {
      return this._defaultCat;
    }

    if (this.isFetchDataFromLive()) {
      this.logger.info('Request default category from live');
      const list = await this.liveRequest.getCategoryList();
      this._defaultCat = find(
        list,
        (r: any) => r.key === MarketCatValue.DEFAULT_MARKET_CAT_KEY,
      );
    } else {
      this._defaultCat = this.marketCatHelper.getDefaultCat();
    }
    return this._defaultCat;
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

        throw e;
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

  private async marketTickActionAnalyze(
    marketTickDate: SymbolTickDate[],
    date: string,
  ) {
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

        for (const key in transactions) {
          marketGroupedByTs[ts][key] += transactions[key];
        }

        marketGroupedByTs[ts].symbols.push({
          symbol: symbolTickDate.symbol,
          ts,
          price: value.price,
          ...transactions,
        });
      });
    });

    const marketData = values(marketGroupedByTs);

    this.logger.info(
      `Start save to DB Market Action Analyze data for date ${date}`,
    );
    try {
      await prisma.$transaction([
        prisma.marketTickActionInfo.deleteMany({
          where: {
            ts: {
              gt: moment
                .utc(date)
                .set({
                  hour: 0,
                  minute: 0,
                })
                .unix(),
              lt: moment
                .utc(date)
                .add(1, 'day')
                .set({
                  hour: 0,
                })
                .unix(),
            },
          },
        }),
        ...marketData.map((record) =>
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
                create: record.symbols.map((symbol: any) => ({
                  symbol: symbol.symbol,
                  price: symbol.price,

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
                  buy_value: symbol.buy_value,
                  sell_value: symbol.sell_value,
                })),
              },
            },
          }),
        ),
      ]);
    } catch (e) {
      this.logger.error(`Failed create market tick action data`, e);

      throw e;
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
      buy_value: round(value.buy_value / 10 ** 6),
      sell_value: round(value.sell_value / 10 ** 6),
    };
  }

  private symbolTickActionAnalyze(tickDate: SymbolTickDate) {
    const groupedByMin: Record<number, SymbolTickAnalyzeRecord> = {};

    const date = moment.utc(tickDate.date);

    forEach(tickDate.meta, (tick) => {
      const timeString = tick.time;
      date.set({
        hour: moment.utc(timeString, 'HH:mm:ss').hour(),
        minute: moment.utc(timeString, 'HH:mm:ss').minute(),
        second: 0,
      });

      const ts = date.unix();

      if (!groupedByMin.hasOwnProperty(ts)) {
        groupedByMin[ts] = {
          ts,
          price: tick.p,
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
