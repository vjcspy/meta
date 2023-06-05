import { prisma } from '@modules/core/util/prisma';
import { Injectable } from '@nestjs/common';
import moment from 'moment';

@Injectable()
export class SyncStatus {
  static INFOS: { id: string; meta: any }[] = [];

  async getStatus(key: string) {
    return prisma.syncStatus.findUnique({
      where: {
        key,
      },
    });
  }
  async saveSuccessStatus(key: string, status: any) {
    return prisma.syncStatus.upsert({
      where: {
        key,
      },
      update: status,
      create: status,
    });
  }

  async saveErrorStatus(key: string, error: any) {
    const status = await prisma.syncStatus.findUnique({
      where: {
        key,
      },
    });

    if (!status?.id) {
      await prisma.syncStatus.create({
        data: {
          key,
          number_of_try: 1,
          is_success: false,
          meta: {
            error,
          },
          date: moment().toDate(),
        },
      });
    } else {
      return prisma.syncStatus.update({
        where: {
          key,
        },
        data: {
          number_of_try: !isNaN(status?.number_of_try)
            ? ++status.number_of_try
            : 1,
          error: error?.toString(),
          is_success: false,
          meta: {
            error,
          },
          date: moment().toDate(),
        },
      });
    }
  }
  saveInfo(id: string, meta: any) {
    const info = this.getInfo(id);

    if (info) {
      info.meta = meta;
    } else {
      SyncStatus.INFOS.push({
        id,
        meta,
      });
    }
  }
  getInfo(id: string) {
    return SyncStatus.INFOS.find((_i) => _i.id === id);
  }

  async clearWithPrefix(prefix: string) {
    await prisma.syncStatus.deleteMany({
      where: {
        key: {
          contains: prefix,
        },
      },
    });
  }
}
