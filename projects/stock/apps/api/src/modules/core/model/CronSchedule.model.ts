import { prisma } from '@modules/core/util/prisma';
import { Injectable, Logger } from '@nestjs/common';
import type { CronSchedule } from '@prisma/client';
import * as moment from 'moment';

export enum CronScheduleStatus {
  PENDING,
  SUCCESS,
}
@Injectable()
export class CronScheduleModel {
  private readonly logger = new Logger(CronScheduleModel.name);
  private async cronStart(jobCode: string) {
    return prisma.cronSchedule.create({
      data: {
        job_code: jobCode,
        status: CronScheduleStatus.PENDING,
      },
    });
  }

  async runOneTimePerDay(
    jobCode: string,
    jobFn: () => Promise<any>,
    whenSuccess?: (doc: CronSchedule) => Promise<any>
  ) {
    const schedule = await prisma.cronSchedule.findFirst({
      where: {
        job_code: jobCode,
        created_at: {
          gte: moment().hour(0).minute(0).second(0).toDate(),
          lt: moment().hour(23).minute(59).second(59).toDate(),
        },
      },
    });

    if (schedule?.id) {
      if (schedule.status === CronScheduleStatus.PENDING) {
        this.logger.log(`Job is still pending: ${jobCode}`);

        return;
      }

      if (schedule.status === CronScheduleStatus.SUCCESS) {
        const meta = await whenSuccess(schedule);
        if (typeof meta === 'object') {
          prisma.cronSchedule.update({
            where: {
              id: schedule.id,
            },
            data: {
              meta,
            },
          });
        }
      }
    } else {
      await this.cronStart(jobCode);
      await jobFn();

      const meta = await whenSuccess(schedule);
      prisma.cronSchedule.update({
        where: {
          id: schedule.id,
        },
        data: {
          meta,
          status: CronScheduleStatus.SUCCESS,
        },
      });
    }
  }
}
