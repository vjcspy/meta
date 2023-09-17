import { prisma } from '@modules/core/util/prisma';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { map } from 'lodash';
import * as moment from 'moment';

@Injectable()
export class TickHelper {
  async getHistory(symbol: string, date: string | Date) {
    if (typeof date === 'string') {
      date = moment.utc(date).toDate();
    }

    const data = await prisma.stockInfoTicks.findFirst({
      where: {
        date,
        symbol,
      },
    });

    if (Array.isArray(data?.meta)) {
      data.meta = map(data.meta, (_t: any) => {
        if (Array.isArray(_t) && _t.length === 4) {
          const _tickData: any = {
            time: moment.unix(_t[0]).format('HH:mm:ss'),
            vol: _t[1],
            p: Math.round(Number(_t[2]) / 100) * 100,
            a: _t[3],
          };

          return _tickData;
        }
        throw new HttpException(
          'Tick data in db not valid',
          HttpStatus.BAD_REQUEST,
        );
      });
    }

    return data ?? {};
  }
}
