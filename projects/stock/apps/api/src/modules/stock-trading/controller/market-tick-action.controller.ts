import { TickActionAnalyzeHelper } from '@modules/stock-trading/helper/tick-action-analyze.helper';
import { Controller, Get } from '@nestjs/common';

@Controller('market-tick-action')
export class MarketTickActionController {
  constructor(private tickActionAnalyzeHelper: TickActionAnalyzeHelper) {}

  @Get('test')
  test() {
    this.tickActionAnalyzeHelper.runForDate('2023-12-26');
  }
}
