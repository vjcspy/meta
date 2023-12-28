import { TickActionAnalyzeHelper } from '@modules/stock-trading/helper/tick-action-analyze.helper';
import { MarketTickActionAnalyzePublisher } from '@modules/stock-trading/queue/publisher/market-tick-action-analyze.publisher';
import { MarketTickHistoryAnalyzePublisher } from '@modules/stock-trading/queue/publisher/market-tick-history-analyze.publisher';
import { Controller, Get } from '@nestjs/common';

@Controller('market-tick-action')
export class MarketTickActionController {
  constructor(
    private tickActionAnalyzeHelper: TickActionAnalyzeHelper,
    private readonly marketTickAnalyzePublisher: MarketTickActionAnalyzePublisher,
    private readonly marketTickHistoryAnalyzePublisher: MarketTickHistoryAnalyzePublisher,
  ) {}

  @Get('test')
  test() {
    this.marketTickAnalyzePublisher.publish();
  }

  @Get('test-one')
  testOne() {
    this.tickActionAnalyzeHelper.runForDate('2023-12-26');
  }

  @Get('history-test')
  testHistory() {
    this.marketTickHistoryAnalyzePublisher.publish();
  }
}
