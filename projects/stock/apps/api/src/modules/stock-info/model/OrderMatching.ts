import { prisma } from '@modules/core/util/prisma';
import { SyncStatus } from '@modules/stock-info/model/SyncStatus';
import { Injectable } from '@nestjs/common';
import moment from 'moment';

export enum OrderMatchingType {
  HISTORY = 0,
  INVESTOR = 1,
}

@Injectable()
export class OrderMatching {
  constructor(private readonly syncStatus: SyncStatus) {}
  async saveByCodeAndType(code: string, type: number, data: any) {
    let syncDate = moment().startOf('day');
    if (Array.isArray(data.data) && data.data.length > 0) {
      const _day = data.d;
      if (typeof _day !== 'string') {
        throw new Error(
          'Dữ liệu trả về bị lỗi, không parse được ngày hiện tại'
        );
      }
      syncDate = moment.utc(`${moment().year()}/${_day}`, 'YYYY/DD/MM');

      // Xoá các bản ghi của ngày hôm đó
      await prisma.orderMatching.deleteMany({
        where: {
          date: {
            gte: syncDate.toDate(),
          },
        },
      });

      await prisma.orderMatching.create({
        data: {
          code,
          type,
          date: syncDate.toDate(),
          meta: data,
        },
      });

      await this.syncStatus.saveSuccessStatus(this.getJobIdInfo(code, type), {
        k: this.getJobIdInfo(code, type),
        s: true,
        date: moment().toDate(),
        meta: null,
      });
    }
  }
  getJobIdInfo(code, type) {
    return `sync_om_${code}_${type}`;
  }
}
