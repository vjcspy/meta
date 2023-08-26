import { prisma } from '@modules/core/util/prisma';
import type { TradingStrategyProcessSchema } from '@modules/stock-trading/model/trading-strategy.model';
import { TradingStrategySchema } from '@modules/stock-trading/model/trading-strategy.model';
import { plainToInstance } from 'class-transformer';
import { size } from 'lodash';

export class TradingStrategyRepo {
  async create(
    data: TradingStrategySchema,
    tradingStrategyProcess: TradingStrategyProcessSchema[] = [],
  ) {
    const _data: TradingStrategySchema = plainToInstance(
      TradingStrategySchema,
      data,
      {
        exposeUnsetFields: false,
      },
    );

    if (
      Array.isArray(tradingStrategyProcess) &&
      size(tradingStrategyProcess) > 0
    ) {
      // doc: https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#createmany-1
      return prisma.tradingStrategy.create({
        data: {
          ..._data,
          trading_strategy_process: {
            createMany: {
              data: tradingStrategyProcess,
            },
          },
        },
      });
    }

    return prisma.tradingStrategy.create({
      data: _data,
    });
  }

  async getById(id: number) {
    return prisma.tradingStrategy.findUnique({
      where: { id },
    });
  }

  async getByHash(hash: string) {
    return prisma.tradingStrategy.findUnique({
      where: { hash },
    });
  }

  async update(id: number, data: TradingStrategySchema) {
    const _data = plainToInstance(TradingStrategySchema, data, {
      excludeExtraneousValues: true,
      exposeUnsetFields: false,
    });
    return prisma.tradingStrategy.update({
      where: { id },
      data: _data,
    });
  }

  async delete(id: number) {
    return prisma.tradingStrategy.delete({
      where: { id },
    });
  }
}
