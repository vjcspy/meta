import { OkResponse } from '@modules/core/model/ok-response';
import {
  GetStockTradingAnalysisRequest,
  StockTradingAnalysisResponse,
  UpdateStockTradingAnalysisDto,
} from '@modules/stock-trading/controller/analysis.dto';
import { StockTradingAnalysisPublisher } from '@modules/stock-trading/queue/publisher/stock-trading-analysis.publisher';
import { StockTradingAnalysisRepo } from '@modules/stock-trading/repo/stock-trading-analysis.repo';
import { XLogger } from '@nest/base';
import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Patch,
  Query,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

@Controller('stock-trading')
export class AnalysisController {
  private readonly logger: XLogger = new XLogger(AnalysisController.name);

  constructor(
    private readonly stockTradingAnalysisRepo: StockTradingAnalysisRepo,
    private readonly stockTradingAnalysisPublisher: StockTradingAnalysisPublisher,
  ) {}

  @Patch('analysis')
  async updateAnalysis(@Body() data: UpdateStockTradingAnalysisDto) {
    this.logger.info('process update analysis', { data });

    const res = await this.stockTradingAnalysisRepo.update(data);

    return plainToInstance(StockTradingAnalysisResponse, res, {
      excludeExtraneousValues: true,
    });
  }

  @Get('analysis')
  async getAnalysis(
    @Query() request: GetStockTradingAnalysisRequest,
  ): Promise<StockTradingAnalysisResponse> {
    const { symbol } = request;
    let data: any;
    if (symbol) {
      data = await this.stockTradingAnalysisRepo.findOne(symbol);
    } else {
      data = await this.stockTradingAnalysisRepo.findAll();
    }

    if (!data || (Array.isArray(data) && data.length === 0)) {
      throw new HttpException(
        'Not found. Check symbol or run job to analyze',
        HttpStatus.NOT_FOUND,
      );
    }

    return plainToInstance(StockTradingAnalysisResponse, data, {
      excludeExtraneousValues: true,
    });
  }

  @Get('analysis-v1')
  async getAnalysisV1(@Query() request: GetStockTradingAnalysisRequest) {
    const { symbol } = request;
    let data: any;
    if (symbol) {
      data = await this.stockTradingAnalysisRepo.findOne(symbol);
    } else {
      data = await this.stockTradingAnalysisRepo.findAll();
    }

    if (!data || (Array.isArray(data) && data.length === 0)) {
      throw new HttpException(
        'Not found. Check symbol or run job to analyze',
        HttpStatus.NOT_FOUND,
      );
    }

    return new OkResponse(
      undefined,
      plainToInstance(StockTradingAnalysisResponse, data, {
        excludeExtraneousValues: true,
      }),
    );
  }

  @Get('analyze-test')
  test(@Query('symbol') symbol: string) {
    if (!symbol) {
      this.stockTradingAnalysisPublisher.publish();
    } else {
      this.stockTradingAnalysisPublisher.publish(symbol);
    }

    return {};
  }
}
