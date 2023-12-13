import { OkResponse } from '@modules/core/model/ok-response';
import { GetSymbolInfoQuery } from '@modules/stock-info/controller/cor.dto';
import {
  GetTickHistoriesRequest,
  GetTickHistoryRequest,
} from '@modules/stock-info/controller/tick.dto';
import { StockPriceHelper } from '@modules/stock-info/helper/stock-price.helper';
import { SyncTicksHelper } from '@modules/stock-info/helper/sync-ticks.helper';
import { TickHelper } from '@modules/stock-info/helper/tick.helper';
import { SyncTicksPublisher } from '@modules/stock-info/queue/publisher/sync-ticks.publisher';
import { XLogger } from '@nest/base';
import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { isTradingTime } from '@stock/packages-com/dist/util/isTradingTime';
import type { Moment } from 'moment';
import moment from 'moment/moment';

@Controller('tick')
export class TickController {
  static _SYNC_CHECK_CACHE_INFO: Record<string, Moment> = {};

  private readonly logger = new XLogger(TickController.name);

  constructor(
    private readonly tickHelper: TickHelper,
    private syncTickPublisher: SyncTicksPublisher,
    private syncTickHelper: SyncTicksHelper,
    private stockPriceHelper: StockPriceHelper,
  ) {}

  @Get('history')
  getTick(@Query() request: GetTickHistoryRequest) {
    const { date, symbol } = request;
    this.logger.info('process get tick for symbol', {
      symbol,
      date,
    });
    return this.tickHelper.getHistory(symbol, date);
  }

  @Get('intra-day')
  async getTickIntraDay(@Query() request: GetTickHistoryRequest) {
    const { date, symbol } = request;
    this.logger.info('process get tick  for symbol', {
      symbol,
      date,
    });
    const tick = await this.tickHelper.getHistory(symbol, date);
    return new OkResponse(undefined, tick);
  }

  @Get('histories')
  getHistories(@Query() request: GetTickHistoriesRequest) {
    const { from, to, symbol } = request;
    this.logger.info('process get tick histories for symbol', {
      symbol,
      from,
      to,
    });
    return this.tickHelper.getHistories(symbol, from, to);
  }

  @Get('histories-v1')
  async getHistoriesV1(@Query() request: GetTickHistoriesRequest) {
    const { from, to, symbol } = request;
    this.logger.info(
      `process get tick histories for symbol ${request.symbol}`,
      {
        symbol,
        from,
        to,
      },
    );
    const his = await this.tickHelper.getHistories(symbol, from, to);

    return new OkResponse(undefined, his);
  }

  @Get('histories-v2')
  async getHistoriesV2(@Query() request: GetTickHistoriesRequest) {
    const { from, to, symbol } = request;
    this.logger.info(
      `process get tick historiesV2 for symbol ${request.symbol}`,
      {
        symbol,
        from,
        to,
      },
    );
    const his = await this.tickHelper.getHistoriesV2(symbol, from, to);

    return new OkResponse(undefined, his);
  }

  @Get('refresh-tick')
  async refreshTick(@Query() infoQuery: GetSymbolInfoQuery) {
    if (!isTradingTime()) {
      throw new BadRequestException('Not in trading time');
    }

    if (
      !TickController._SYNC_CHECK_CACHE_INFO[infoQuery.symbol] ||
      !moment().isSame(
        TickController._SYNC_CHECK_CACHE_INFO[infoQuery.symbol],
        'day',
      )
    ) {
      TickController._SYNC_CHECK_CACHE_INFO[infoQuery.symbol] = moment();
      const tick: any = await this.tickHelper.getHistory(
        infoQuery.symbol,
        moment().toDate(),
      );

      const price = await this.stockPriceHelper.getHistory(
        infoQuery.symbol,
        moment().toDate(),
        moment().toDate(),
      );

      if (price?.length > 0 && !tick?.id) {
        this.syncTickHelper.syncTicks(infoQuery.symbol);
        return new OkResponse();
      }
    }

    this.syncTickPublisher.publishRefreshTick(infoQuery.symbol);

    return new OkResponse();
  }
}
