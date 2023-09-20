import {
  GetTickHistoriesRequest,
  GetTickHistoryRequest,
} from '@modules/stock-info/controller/tick.dto';
import { TickHelper } from '@modules/stock-info/helper/tick.helper';
import { Controller, Get, Query } from '@nestjs/common';

@Controller('tick')
export class TickController {
  constructor(private readonly tickHelper: TickHelper) {}

  @Get('history')
  getTick(@Query() request: GetTickHistoryRequest) {
    const { date, symbol } = request;

    return this.tickHelper.getHistory(symbol, date);
  }

  @Get('histories')
  getHistories(@Query() request: GetTickHistoriesRequest) {
    const { from, to, symbol } = request;

    return this.tickHelper.getHistories(symbol, from, to);
  }
}
