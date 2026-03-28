import { SyncStatus } from '@modules/stock-info/model/SyncStatus';
import { Injectable } from '@nestjs/common';
import type { DataObject } from 'chitility';
import * as moment from 'moment';

export enum OrderMatchingType {
  HISTORY = 0,
  INVESTOR = 1,
}

@Injectable()
export class OrderMatching {
  constructor(private readonly syncStatus: SyncStatus) {}

  async saveByCodeAndType(code: string, type: number, dataObject: DataObject) {
    const res: any = dataObject.getData();
    const { data, page } = res;
    // let syncDate = moment().startOf('day');
    if (Array.isArray(data) && data.length > 0) {
      const _day = res.d;
      if (typeof _day !== 'string') {
        throw new Error(
          'Dữ liệu trả về bị lỗi, không parse được ngày hiện tại',
        );
      }
      // syncDate = moment.utc(`${moment().year()}/${_day}`, 'YYYY/DD/MM');

      // Xoá các bản ghi của ngày hôm đó
      // await prisma.orderMatching.deleteMany({
      //   where: {
      //     date: syncDate.toDate(),
      //     code,
      //     type,
      //     page,
      //   },
      // });

      // await prisma.orderMatching.create({
      //   data: {
      //     code,
      //     type,
      //     date: syncDate.toDate(),
      //     page,
      //     meta: res,
      //   },
      // });

      await this.syncStatus.saveSuccessStatus(this.getJobIdInfo(code, type), {
        key: this.getJobIdInfo(code, type),
        is_success: false,
        page,
        date: moment().toDate(),
      });
    } else {
      throw new Error('Please check data before save');
    }
  }

  getJobIdInfo(code, type) {
    return `sync_om_${code}_${type}`;
  }
}
