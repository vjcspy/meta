import { prisma } from '@modules/core/util/prisma';
import { transformAndValidateBscPrice } from '@modules/stock-info/requests/bsc/BscPrice.dto';
import { getStockPriceJobId } from '@modules/stock-info/util/stock-price/getStockPriceJobId';
import { Injectable } from '@nestjs/common';
import type { DataObject } from 'chitility';
import { map, size } from 'lodash';

@Injectable()
export class StockPriceRepo {
  public async saveMany(code: string, data: DataObject) {
    let lastDate: any;
    const records = map(data.getData(), (value: any) => {
      if (!lastDate || lastDate < value.Date) {
        lastDate = value.Date;
      }
      return transformAndValidateBscPrice(value);
    });
    let firstTime = false;
    if (size(records) > 20) {
      firstTime = true;
      // consider it as the first time
      await prisma.stockPrice.deleteMany({
        where: {
          symbol: code,
        },
      });
    }

    if (firstTime) {
      // eslint-disable-next-line no-restricted-syntax
      // for (const price of records) {
      //   try {
      //     await prisma.stockPrice.create({
      //       data: price,
      //     });
      //   } catch (e) {
      //     console.log(price);
      //     throw e;
      //   }
      // }
      await prisma.stockPrice.createMany({
        data: records,
      });
    } else {
      // eslint-disable-next-line no-restricted-syntax
      for (const price of records) {
        await prisma.stockPrice.upsert({
          where: {
            symbol_date: { symbol: price.symbol, date: price.date },
          },
          update: price,
          create: price,
        });
      }
    }

    await prisma.syncStatus.upsert({
      where: { key: getStockPriceJobId(code) },
      update: {
        date: lastDate,
        is_success: true,
      },
      create: {
        key: getStockPriceJobId(code),
        date: lastDate,
        is_success: true,
      },
    });
  }

  public async getHistory(code: string, from: Date, to: Date = new Date()) {
    return prisma.stockPrice.findMany({
      where: {
        symbol: code,
        date: {
          lte: to,
          gte: from,
        },
      },
      orderBy: {
        date: 'desc',
      },
    });
  }
}
