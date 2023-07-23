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
  private async cronStart(jobCode: string, meta?: any) {
    return prisma.cronSchedule.create({
      data: {
        job_code: jobCode,
        status: CronScheduleStatus.PENDING,
        meta,
      },
    });
  }

  async runOneTimePerDay(
    jobCode: string,
    jobFn: () => Promise<any>,
    whenSuccess?: (doc: CronSchedule) => Promise<any>,
  ) {
    let schedule = await prisma.cronSchedule.findFirst({
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
        const successMeta = await whenSuccess(schedule);
        const oMeta =
          typeof schedule?.meta === 'object'
            ? schedule.meta
            : typeof schedule?.meta === 'string'
            ? JSON.parse(schedule.meta)
            : {};

        if (typeof successMeta === 'object') {
          await prisma.cronSchedule.update({
            where: {
              id: schedule.id,
            },
            data: {
              meta: {
                ...oMeta,
                ...successMeta,
              },
            },
          });
        }
      }
    } else {
      const startMeta = await jobFn();
      schedule = await this.cronStart(jobCode, startMeta);

      const successMeta = await whenSuccess(schedule);
      await prisma.cronSchedule.update({
        where: {
          id: schedule.id,
        },
        data: {
          meta: { ...startMeta, ...successMeta },
          status: CronScheduleStatus.SUCCESS,
        },
      });

      this.logger.log(`Successfully run cron ${jobCode}`);
    }
  }
}
