import { prisma } from '@modules/core/util/prisma';
import { UpdateStockTradingAnalysisDto } from '@modules/stock-trading/controller/analysis.dto';
import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class StockTradingAnalysisRepo {
  async findAll() {
    return prisma.stockTradingAnalysis.findMany();
  }

  async findOne(symbol: string) {
    return prisma.stockTradingAnalysis.findFirst({
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
    return prisma.stockTradingAnalysis.upsert({
      where: { symbol: _data.symbol },
      update: _data,
      create: _data,
    });
  }
}
