import { OkResponse } from '@modules/core/model/ok-response';
import { GetSymbolInfoQuery } from '@modules/stock-info/controller/cor.dto';
import {
  GetTickHistoriesRequest,
  GetTickHistoryRequest,
} from '@modules/stock-info/controller/tick.dto';
import { TickHelper } from '@modules/stock-info/helper/tick.helper';
import { RefreshTickConsumer } from '@modules/stock-info/queue/consumer/refresh-tick.consumer';
import { SyncTicksPublisher } from '@modules/stock-info/queue/publisher/sync-ticks.publisher';
import { XLogger } from '@nest/base';
import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { isTradingTime } from '@stock/packages-com/dist/util/isTradingTime';

@Controller('tick')
export class TickController {
  private readonly logger = new XLogger(TickController.name);

  constructor(
    private readonly tickHelper: TickHelper,
    private refreshTickConsumer: RefreshTickConsumer,
    private syncTickPublisher: SyncTicksPublisher,
  ) {}

  @Get('history')
  getTick(@Query() request: GetTickHistoryRequest) {
    const { date, symbol } = request;
    this.logger.info('prcoess get tick  for symbol', {
      symbol,
      date,
    });
    return this.tickHelper.getHistory(symbol, date);
  }

  @Get('intra-day')
  async getTickIntraDay(@Query() request: GetTickHistoryRequest) {
    const { date, symbol } = request;
    this.logger.info('prcoess get tick  for symbol', {
      symbol,
      date,
    });
    const tick = await this.tickHelper.getHistory(symbol, date);
    return new OkResponse(undefined, tick);
  }

  @Get('histories')
  getHistories(@Query() request: GetTickHistoriesRequest) {
    const { from, to, symbol } = request;
    this.logger.info('prcoess get tick histories for symbol', {
      symbol,
      from,
      to,
    });
    return this.tickHelper.getHistories(symbol, from, to);
  }

  @Get('histories-v1')
  async getHistoriesV1(@Query() request: GetTickHistoriesRequest) {
    const { from, to, symbol } = request;
    this.logger.info('prcoess get tick histories for symbol', {
      symbol,
      from,
      to,
    });
    const his = await this.tickHelper.getHistories(symbol, from, to);

    return new OkResponse(undefined, his);
  }

  @Get('refresh-tick')
  async refreshTick(@Query() infoQuery: GetSymbolInfoQuery) {
    if (!isTradingTime()) {
      throw new BadRequestException('Not in trading time');
    }
    this.syncTickPublisher.publishRefreshTick(infoQuery.symbol);

    return new OkResponse();
  }
}
