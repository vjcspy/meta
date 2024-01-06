import { OkResponse } from '@modules/core/model/ok-response';
import { GetMarketTickActionRequest } from '@modules/stock-trading/controller/market-tick.action.dto';
import { TickActionJob } from '@modules/stock-trading/cron/tick-action.job';
import { TickActionAnalyzeHelper } from '@modules/stock-trading/helper/tick-action-analyze.helper';
import { MarketTickActionConsumer } from '@modules/stock-trading/queue/consumer/market-tick-action.consumer';
import { MarketTickAnalyzeHistoryConsumer } from '@modules/stock-trading/queue/consumer/market-tick-analyze-history.consumer';
import { MarketTickActionAnalyzePublisher } from '@modules/stock-trading/queue/publisher/market-tick-action-analyze.publisher';
import { MarketTickHistoryAnalyzePublisher } from '@modules/stock-trading/queue/publisher/market-tick-history-analyze.publisher';
import { Controller, Get, Query } from '@nestjs/common';

@Controller('market-tick-action')
export class MarketTickActionController {
  constructor(
    private tickActionAnalyzeHelper: TickActionAnalyzeHelper,
    private readonly marketTickAnalyzePublisher: MarketTickActionAnalyzePublisher,
    private readonly marketTickHistoryAnalyzePublisher: MarketTickHistoryAnalyzePublisher,
    private readonly marketTickActionConsumer: MarketTickActionConsumer,
    private readonly marketTickAnalyzeConsumer: MarketTickAnalyzeHistoryConsumer,
    private readonly tickActionJob: TickActionJob,
  ) {}

  @Get('test')
  test() {
    this.tickActionJob.generateTickActionToDay();
  }

  @Get('test-one')
  testOne() {
    this.marketTickActionConsumer.pubSubHandler('2023-12-25');
    this.marketTickActionConsumer.pubSubHandler('2023-12-26');
    this.marketTickActionConsumer.pubSubHandler('2023-12-27');
    this.marketTickActionConsumer.pubSubHandler('2023-12-28');
    this.marketTickActionConsumer.pubSubHandler('2023-12-29');
  }

  @Get('tick-test-all')
  tickTestAll() {
    this.marketTickAnalyzePublisher.publish();
  }

  @Get('history-test-all')
  historyTestAll() {
    this.marketTickHistoryAnalyzePublisher.publish();
  }

  @Get('history-test-one')
  testHistoryOne() {
    this.tickActionAnalyzeHelper.analyzeHistoryDataForDate('2023-12-29');
  }

  @Get('intra-day-speed')
  async history(@Query() request: GetMarketTickActionRequest) {
    const data = await this.tickActionAnalyzeHelper.getHistoryDataForDate(
      request.symbol,
      request.date,
    );

    return new OkResponse(undefined, data);
  }
}
