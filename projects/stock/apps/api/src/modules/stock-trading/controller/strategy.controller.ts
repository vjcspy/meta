import {
  StrategyDto,
  StrategyProcessDto,
  TradingStrategyResponse,
} from '@modules/stock-trading/controller/strategy.dto';
import { TradingStrategyHelper } from '@modules/stock-trading/helper/trading-strategy.helper';
import { TradingStrategyRepo } from '@modules/stock-trading/repo/trading-strategy.repo';
import { XLogger } from '@nest/base/dist';
import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

@Controller('strategy')
export class StrategyController {
  private readonly logger: XLogger = new XLogger(StrategyController.name);

  constructor(
    private readonly tradingStrategyHelper: TradingStrategyHelper,
    private readonly tradingStrategyRepo: TradingStrategyRepo,
  ) {}

  @Post('process')
  async processData(@Body() data: StrategyDto) {
    this.logger.info('processData', {
      data,
    });
    await this.tradingStrategyHelper.processStrategy(data);

    return { message: 'Data received and validated successfully' };
  }

  @Get('process')
  async getProcess(@Query() dto: StrategyProcessDto) {
    const strategy = await this.tradingStrategyRepo.getProcess(
      dto.hash,
      dto.symbol,
    );

    if (strategy && strategy.id) {
      return plainToInstance(TradingStrategyResponse, strategy, {
        excludeExtraneousValues: true,
        exposeUnsetFields: false,
      });
    }
    throw new HttpException('Strategy not found', HttpStatus.NOT_FOUND);
  }
}
