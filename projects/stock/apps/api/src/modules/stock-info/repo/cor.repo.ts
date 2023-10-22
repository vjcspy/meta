import { prisma } from '@modules/core/util/prisma';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CorRepo {
  async getAll() {
    return prisma.cor_entity.findMany({});
  }

  async getOne(symbol: string) {
    return prisma.cor_entity.findFirst({
      where: {
        code: symbol,
      },
    });
  }
}
