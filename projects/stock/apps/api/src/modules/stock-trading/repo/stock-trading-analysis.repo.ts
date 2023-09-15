import { getPrismaClient } from '@modules/core/util/prisma';
import { UpdateStockTradingAnalysisDto } from '@modules/stock-trading/controller/analysis.dto';
import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class StockTradingAnalysisRepo {
  private readonly prisma = getPrismaClient();

  async findAll() {
    return this.prisma.stockTradingAnalysis.findMany();
  }

  async findOne(symbol: string) {
    return this.prisma.stockTradingAnalysis.findFirst({
      where: { symbol },
    });
  }

  async update(data: UpdateStockTradingAnalysisDto) {
    const _data: UpdateStockTradingAnalysisDto = plainToInstance(
      UpdateStockTradingAnalysisDto,
      data,
      {
        exposeUnsetFields: false,
      },
    );
    return this.prisma.stockTradingAnalysis.upsert({
      where: { symbol: _data.symbol },
      update: _data,
      create: _data,
    });
  }
}
