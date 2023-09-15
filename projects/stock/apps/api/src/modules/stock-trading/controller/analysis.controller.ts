import {
  GetStockTradingAnalysisRequest,
  StockTradingAnalysisResponse,
  UpdateStockTradingAnalysisDto,
} from '@modules/stock-trading/controller/analysis.dto';
import { StockTradingAnalysisRepo } from '@modules/stock-trading/repo/stock-trading-analysis.repo';
import { XLogger } from '@nest/base/dist';
import { Body, Controller, Get, Patch, Query } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

@Controller('stock-trading')
export class AnalysisController {
  private readonly logger: XLogger = new XLogger(AnalysisController.name);

  constructor(
    private readonly stockTradingAnalysisRepo: StockTradingAnalysisRepo,
  ) {}

  @Patch('update-analysis')
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
      data = this.stockTradingAnalysisRepo.findOne(symbol);
    } else {
      data = this.stockTradingAnalysisRepo.findAll();
    }
    return plainToInstance(StockTradingAnalysisResponse, data, {
      excludeExtraneousValues: true,
    });
  }
}
