import { FlagRepo } from '@modules/core/repo/flag.repo';
import {
  HEALTH_CHECK_TIME_DB,
  HEALTH_CHECK_TIME_QUEUE_AND_DB,
} from '@modules/healthcheck/values/healthcheck.values';
import { Controller, Get } from '@nestjs/common';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

@Controller('health')
export class HealthController {
  constructor(private readonly flagRepo: FlagRepo) {}

  @Get('/check-queue-and-db')
  async checkQueueAndDB() {
    const time = await this.flagRepo.findByKey(HEALTH_CHECK_TIME_QUEUE_AND_DB);
    if (time && !Number.isNaN(time.value)) {
      return format(Number(time.value), 'dd/MM/yyyy HH:mm:ss', { locale: vi });
    }
    return null;
  }

  @Get('/check-db')
  async checkDB() {
    const time = await this.flagRepo.findByKey(HEALTH_CHECK_TIME_DB);
    if (time && !Number.isNaN(time.value)) {
      return format(Number(time.value), 'dd/MM/yyyy HH:mm:ss', { locale: vi });
    }
    return null;
  }
}
