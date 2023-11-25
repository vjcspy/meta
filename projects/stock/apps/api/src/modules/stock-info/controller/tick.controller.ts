import { OkResponse } from '@modules/core/model/ok-response';
import {
  GetTickHistoriesRequest,
  GetTickHistoryRequest,
} from '@modules/stock-info/controller/tick.dto';
import { TickHelper } from '@modules/stock-info/helper/tick.helper';
import { XLogger } from '@nest/base';
import { Controller, Get, Query } from '@nestjs/common';

@Controller('tick')
export class TickController {
  private readonly logger = new XLogger(TickController.name);

  constructor(private readonly tickHelper: TickHelper) {}

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
}
