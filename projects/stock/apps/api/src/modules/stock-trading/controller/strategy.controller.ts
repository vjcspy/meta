import { OkResponse } from '@modules/core/model/ok-response';
import {
  BulkSubmitActionDto,
  StrategyDto,
  StrategyProcessDto,
  StrategyProcessRequest,
  StrategyProcessUpdateDto,
  TradingStrategyResponse,
} from '@modules/stock-trading/controller/strategy.dto';
import { TradingStrategyHelper } from '@modules/stock-trading/helper/trading-strategy.helper';
import { TradingStrategyRepo } from '@modules/stock-trading/repo/trading-strategy.repo';
import { XLogger } from '@nest/base';
import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Patch,
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

  /**
   * Generate strategy process
   * @param data
   * @returns {Promise<{message: string}>}
   */
  @Post('process')
  async processData(@Body() data: StrategyDto) {
    this.logger.info('processData', {
      data,
    });
    await this.tradingStrategyHelper.processStrategy(data);

    return { message: 'Data received and validated successfully' };
  }

  /**
   * Lấy thông tin của trading process cần xử lý
   * @param dto
   * @returns {Promise<TradingStrategyResponse[]>}
   */
  @Get('process')
  async getProcess(@Query() dto: StrategyProcessDto) {
    this.logger.info(
      `getProcess for hash ${dto.hash} and symbol ${dto.symbol}`,
    );
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

  @Patch('process')
  async updateProcess(@Body() data: StrategyProcessUpdateDto) {
    this.logger.info('trading strategy update process state');
    await this.tradingStrategyHelper.updateProcessState(data);

    return new OkResponse('update successfully');
  }

  @Post('bulk-submit-action')
  async bulkSubmitAction(@Body() data: BulkSubmitActionDto) {
    this.logger.info('trading strategy process bulk submit action');

    await this.tradingStrategyHelper.bulkSubmitAction(data);

    return new OkResponse('submit strategy action successfully');
  }

  @Get('retry-error-process')
  async retryPublishProcess(@Query() rq: StrategyProcessRequest) {
    this.logger.info(`retryPublishProcess for hash ${rq.hash}`);

    await this.tradingStrategyHelper.retryErrorProcess(rq);

    return new OkResponse('retry successfully');
  }

  @Get('strategy-processes')
  async getStrategyProcesses(@Query() rq: StrategyProcessRequest) {
    this.logger.info(`getStrategyProcesses for hash ${rq.hash}`);
    const strategy = await this.tradingStrategyRepo.getProcesses(rq.hash);

    if (strategy && strategy.id) {
      return plainToInstance(TradingStrategyResponse, strategy, {
        excludeExtraneousValues: true,
        exposeUnsetFields: false,
      });
    }
    throw new HttpException('Strategy not found', HttpStatus.NOT_FOUND);
  }

  @Get('strategy-process-actions')
  async getStrategyProcessActions(@Query() rq: StrategyProcessDto) {
    this.logger.info(
      `getStrategyProcessActions for hash ${rq.hash} symbol ${rq.symbol}`,
    );
    const strategy = await this.tradingStrategyRepo.getProcessActions(
      rq.hash,
      rq.symbol,
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
