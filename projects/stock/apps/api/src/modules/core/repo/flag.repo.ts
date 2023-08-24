import { Injectable } from '@nestjs/common';
import type { Flag } from '@prisma/client';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class FlagRepo {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(data: { key: string; value: string }): Promise<Flag> {
    return this.prisma.flag.create({
      data,
    });
  }

  async findByKey(key: string): Promise<Flag | null> {
    return this.prisma.flag.findUnique({
      where: { key },
    });
  }

  async update(key: string, value: string): Promise<Flag> {
    return this.prisma.flag.upsert({
      where: { key },
      create: { key, value },
      update: { value },
    });
  }

  async delete(key: string): Promise<Flag> {
    return this.prisma.flag.delete({
      where: { key },
    });
  }
}
