import { prisma } from '@modules/core/util/prisma';
import { SyncStatus } from '@modules/stock-info/model/SyncStatus';
import { StockTradingBaseHelper } from '@modules/stock-trading/helper/stock-trading-base.helper';
import { LiveRequest } from '@modules/stock-trading/requests/live/live.request';
import { XLogger } from '@nest/base';
import { Injectable, NotFoundException } from '@nestjs/common';
import { forEach, isNumber, round } from 'lodash';
import * as moment from 'moment/moment';

@Injectable()
export class TradingAnalysisHelper {
  private static HISTORY_DAYS = 5;

  private readonly logger = new XLogger(TradingAnalysisHelper.name);

  constructor(
    private stockTradingBaseHelper: StockTradingBaseHelper,
    private liveRequest: LiveRequest,
    private syncStatus: SyncStatus,
  ) {}

  /**
   * @Deprecated Will combine into `stock_trading_analysis` table
   *
   * */
  async analysisHistoryForDate(date: string) {
    this.logger.info(`Start analysis history for date ${date}`);
    const mDate = moment.utc(date).toDate();
    const syncStatus = await this.syncStatus.getStatusByDate(
      this.getKey(date),
      mDate,
    );

    if (syncStatus?.is_success) {
      this.logger.info(
        `Skipping generate analysis history for date ${date} due to already SUCCESS`,
      );

      return;
    }

    // check if has vnIndex to day
    const hasTrade =
      await this.stockTradingBaseHelper.isHasVNIndexForDate(date);

    if (!hasTrade) {
      this.logger.info(
        `Skipping generate analysis history for date ${date} due to not found VNINDEX`,
      );
      return;
    }

    const defaultCat = await this.liveRequest.getDefaultCat();

    if (!Array.isArray(defaultCat.symbols) || defaultCat.symbols.length === 0) {
      throw new Error('Something went wrong with default category data');
    }
    for (let i = 0; i < defaultCat.symbols.length; i++) {
      await this.analyzeHistoryForDate(defaultCat.symbols[i], date);
    }
    this.logger.info(
      'start generating analysis history data for all symbols in category',
    );
    const data = await Promise.all(
      defaultCat.symbols.map((symbol: string) =>
        this.analyzeHistoryForDate(symbol, date),
      ),
    );
    this.logger.info('start saving data to DB');
    await prisma.stockTradingAnalysisHistory.createMany({
      data,
    });

    await this.syncStatus.saveSuccessStatus(this.getKey(date), {
      key: this.getKey(date),
      is_success: true,
      date: mDate,
    });
    this.logger.info('Success generate analysis history data');
  }

  async getAnalysisHistory(symbol: string, date: string) {
    const analysisHistory = await prisma.stockTradingAnalysisHistory.findFirst({
      where: {
        date: moment.utc(date).toDate(),
        symbol,
      },
    });

    if (!analysisHistory) {
      throw new NotFoundException(
        `Not found analysis history for symbol ${symbol} at date ${date}`,
      );
    }

    return analysisHistory;
  }

  async getLastAnalysisHistory(symbol: string, date: string) {
    const analysisHistory = await prisma.stockTradingAnalysisHistory.findFirst({
      where: {
        date: {
          lt: moment.utc(date).toDate(),
        },
        symbol,
      },
      orderBy: {
        date: 'desc',
      },
    });

    if (!analysisHistory) {
      throw new NotFoundException(
        `Not found analysis history for symbol ${symbol} at date ${date}`,
      );
    }

    return analysisHistory;
  }

  private async analyzeHistoryForDate(symbol: string, date: string) {
    const endDate = moment.utc(date).toDate();

    const prices = await prisma.simpleStockPrice.findMany({
      where: {
        symbol,
        date: {
          lte: endDate,
        },
      },
      take: TradingAnalysisHelper.HISTORY_DAYS,
    });

    if (prices.length !== TradingAnalysisHelper.HISTORY_DAYS) {
      throw new Error(
        `Not enough 5 days history for symbol ${symbol} at date ${date}`,
      );
    }

    let sum_deal_value = 0;

    forEach(prices, (p) => {
      if (!isNumber(p.priceAverage) || p.priceAverage === 0) {
        throw new Error(`Price average of symbol ${symbol} invalid`);
      }
      sum_deal_value += p.dealVolume * p.priceAverage;
    });

    return {
      symbol,
      date: endDate,
      deal_value_5: round(
        sum_deal_value / TradingAnalysisHelper.HISTORY_DAYS / 10 ** 6,
      ),
    };
  }

  private getKey(date: string) {
    return `generate_analysis_history_nodejs_${date}`;
  }
}
