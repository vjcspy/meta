import { TickActionAnalyzeHelper } from '@modules/stock-trading/helper/tick-action-analyze.helper';
import { MarketTickActionAnalyzePublisher } from '@modules/stock-trading/queue/publisher/market-tick-action-analyze.publisher';
import { Controller, Get } from '@nestjs/common';

@Controller('market-tick-action')
export class MarketTickActionController {
  constructor(
    private tickActionAnalyzeHelper: TickActionAnalyzeHelper,
    private readonly marketTickAnalyzePublisher: MarketTickActionAnalyzePublisher,
  ) {}

  @Get('test')
  test() {
    this.marketTickAnalyzePublisher.publish();
  }

  @Get('history-test')
  testHistory() {
    this.tickActionAnalyzeHelper.analyzeHistoryDataForDate('2023-12-26');
  }
}
