import { prisma } from '@modules/core/util/prisma';
import { AlertDto } from '@modules/stock-trading/controller/alert.dto';
import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class StockAlertRepo {
  getAll() {
    return prisma.stockAlert.findMany({});
  }

  updateAlert(data: AlertDto) {
    const _data: AlertDto = plainToInstance(AlertDto, data, {
      exposeUnsetFields: false,
    });
    if (_data.id) {
      return prisma.stockAlert.upsert({
        where: { id: Number(_data.id) },
        update: {
          name: _data.name,
          conditions: _data.conditions,
          state: _data.state,
          symbol: _data.symbol,
        },
        create: {
          name: _data.name,
          conditions: _data.conditions,
          state: _data.state,
          symbol: _data.symbol,
        },
      });
    }

    return prisma.stockAlert.create({
      data: {
        name: _data.name,
        conditions: _data.conditions,
        state: _data.state,
        symbol: _data.symbol,
      },
    });
  }

  deleteAlert(id: number) {
    return prisma.stockAlert.delete({
      where: {
        id,
      },
    });
  }
}
