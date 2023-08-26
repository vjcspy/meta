import { StrategyDto } from '@modules/stock-trading/controller/strategy.dto';
import { TradingStrategyHelper } from '@modules/stock-trading/helper/trading-strategy.helper';
import { XAppRequestContext, XLogger } from '@nest/base/dist';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('strategy')
export class StrategyController {
  private readonly logger: XLogger = new XLogger(StrategyController.name);

  constructor(
    private readonly tradingStrategyHelper: TradingStrategyHelper,
    private readonly xAppContext: XAppRequestContext,
  ) {}

  @Post('process-data')
  async processData(@Body() data: StrategyDto) {
    this.logger.info('processData', {
      data,
    });
    await this.tradingStrategyHelper.processStrategy(data);

    return { message: 'Data received and validated successfully' };
  }
}
