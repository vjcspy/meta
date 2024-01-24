import { prisma } from '@modules/core/util/prisma';
import { StockInfoValue } from '@modules/stock-info/values/stock-info.value';
import { TickActionAnalyzeHelper } from '@modules/stock-trading/helper/tick-action-analyze.helper';
import {
  MARKET_TICK_ACTION_DAY_TYPE,
  MARKET_TICK_ACTION_TYPE,
} from '@modules/stock-trading/value/market-tick-action.value';
import { AppError, XLogger } from '@nest/base';
import { Injectable } from '@nestjs/common';
import { forEach, round } from 'lodash';
import * as moment from 'moment';

/*
 * Tính tốc độ giao dịch theo từng phút
 * */
@Injectable()
export class TickActionDayAnalyzeHelper {
  private readonly logger = new XLogger(TickActionDayAnalyzeHelper.name);

  private static readonly TICK_ACTION_DAY_TYPE_CHECK = {
    buy_value: 5,
    sell_value: 5,

    shark_buy_value: {
      base: 'buy_value',
      m: 5,
    },
    shark_sell_value: {
      base: 'sell_value',
      m: 5,
    },
    sheep_buy_value: {
      base: 'buy_value',
      m: 5,
    },
    sheep_sell_value: {
      base: 'sell_value',
      m: 5,
    },
  };

  constructor(
    private readonly tickActionAnalyzeHelper: TickActionAnalyzeHelper,
  ) {}

  /**
   * Chỉ chạy ở LOCAL để analyze data, ở live, đang lấy dữ liệu realtime và tính toán luôn trên FE
   * @param date
   * @returns {Promise<void>}
   */
  async runOneTimePerDayWithCheckJobInfo(date: string) {
    this.logger.info(`Run with check job info for symbol date ${date}`);

    const existed = await prisma.marketTickJobInfo.findUnique({
      where: {
        date_type_symbol: {
          date: moment.utc(date).toDate(),
          type: MARKET_TICK_ACTION_DAY_TYPE,
          symbol: StockInfoValue.VNINDEX_CODE,
        },
      },
    });

    try {
      if (existed?.isSuccess === true) {
        this.logger.info(`Skipping run for date ${date} due to isSuccess`);

        return;
      }

      if (existed && existed.try_count > 2) {
        this.logger.warn(`Skipping run for date ${date} due to try count > 2`);

        return;
      }

      await this.run(date);

      await prisma.marketTickJobInfo.upsert({
        where: {
          date_type_symbol: {
            date: moment.utc(date).toDate(),
            type: MARKET_TICK_ACTION_DAY_TYPE,
            symbol: StockInfoValue.VNINDEX_CODE,
          },
        },
        create: {
          date: moment.utc(date).toDate(),
          type: MARKET_TICK_ACTION_DAY_TYPE,
          symbol: StockInfoValue.VNINDEX_CODE,
          isSuccess: true,
          try_count: 1,
        },
        update: {
          date: moment.utc(date).toDate(),
          type: MARKET_TICK_ACTION_DAY_TYPE,
          symbol: StockInfoValue.VNINDEX_CODE,
          isSuccess: true,
        },
      });
    } catch (e) {
      this.logger.error(`Error when runWithCheckJobInfo for date ${date}`, e);
      await prisma.marketTickJobInfo.upsert({
        where: {
          date_type_symbol: {
            date: moment.utc(date).toDate(),
            type: MARKET_TICK_ACTION_DAY_TYPE,
            symbol: StockInfoValue.VNINDEX_CODE,
          },
        },
        create: {
          date: moment.utc(date).toDate(),
          type: MARKET_TICK_ACTION_DAY_TYPE,
          symbol: StockInfoValue.VNINDEX_CODE,
          isSuccess: false,
          try_count: 1,
          last_error: e?.toString(),
        },
        update: {
          date: moment.utc(date).toDate(),
          type: MARKET_TICK_ACTION_DAY_TYPE,
          symbol: StockInfoValue.VNINDEX_CODE,
          isSuccess: false,
          try_count: (existed?.try_count ?? 0) + 1,
          last_error: e?.toString(),
        },
      });
    }
  }

  /**
   * Lưu ý là nếu mình muốn analyze 1 khoảng thời gian dài thì sẽ dùng function khác để generate cho từng ngày
   *
   * Ở live, table này mình chỉ refresh dữ liệu ngày hiện tại, múc đích là làm realtime alert thôi
   * Ở LOCAL sẽ generate ra vào cuối ngày cho nhiều ngày để query và filter trên LOCAL DB
   *
   * @param date
   * @returns {Promise<void>}
   */
  async runEveryMinutePerDay(date: string) {
    this.logger.info(`Refresh tick action for date ${date}`);
    try {
      await prisma.marketTickActionDayAnalyze.deleteMany({});
      await this.run(date);
    } catch (e) {
      this.logger.error(
        `Error when refresh tick action day analyze for date ${date}`,
        e,
      );
    }
  }

  private async run(date: string) {
    this.logger.info(
      `Starting generate tick action day analyze for date ${date}`,
    );
    // check if this day has resolved tick action
    const jobInfo = await prisma.marketTickJobInfo.findUnique({
      where: {
        date_type_symbol: {
          date: moment.utc(date).toDate(),
          type: MARKET_TICK_ACTION_TYPE,
          symbol: StockInfoValue.VNINDEX_CODE,
        },
      },
    });

    if (!jobInfo || !jobInfo.id) {
      const error = new AppError(
        `Error when run tick action day analyze. Please run market tick action for this day ${date} first`,
      );
      this.logger.error(error.message, error, jobInfo);

      throw error;
    }

    const defaultCat = await this.tickActionAnalyzeHelper.getDefaultCat();

    if (
      !Array.isArray(defaultCat?.symbols) ||
      defaultCat.symbols.length === 0
    ) {
      throw new AppError(`Please check default category`);
    }

    const data = [];

    for (let i = 0; i < defaultCat.symbols.length; i++) {
      const symbol = defaultCat.symbols[i];
      this.logger.info(`process analyze for symbol ${symbol} date ${date}`);
      const tickActionData =
        await this.tickActionAnalyzeHelper.getHistoryDataForDate(symbol, date);

      forEach(tickActionData.tickActionData, (tickInfo) => {
        forEach(
          TickActionDayAnalyzeHelper.TICK_ACTION_DAY_TYPE_CHECK,
          (value: any, key) => {
            const base = value?.base ?? key;
            const multiple = value?.m ?? value;
            const baseValue = tickActionData.tickHistoryAvgData[`avg_${base}`];

            if (baseValue === 0) {
              throw new AppError(`Base value is ZERO, key ${base}`);
            }

            const m = round(
              tickInfo[key] / tickActionData.tickHistoryAvgData[`avg_${base}`],
            );
            if (m >= multiple) {
              data.push({
                symbol,
                ts: tickInfo.ts,
                type: key,
                m,
              });
            }
          },
        );
      });
    }

    this.logger.info(`Save data to db for date ${date}`);

    await prisma.marketTickActionDayAnalyze.createMany({
      data,
    });

    this.logger.info(`Success save data for date ${date}`);
  }
}
