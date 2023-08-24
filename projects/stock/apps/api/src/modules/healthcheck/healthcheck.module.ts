import { CoreModule } from '@modules/core/core.module';
import { HealthController } from '@modules/healthcheck/controller/health.controller';
import { HealthcheckJob } from '@modules/healthcheck/cronjob/healthcheck.job';
import { HealthcheckConsumer } from '@modules/healthcheck/queue/consumer/healthcheck.consumer';
import { HEALTH_CHECK_EXCHANGE_KEY } from '@modules/healthcheck/values/healthcheck.values';
import { RabbitMQModule } from '@nest/rabbitmq/dist';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    CoreModule,
    RabbitMQModule.register({
      exchanges: [
        {
          name: HEALTH_CHECK_EXCHANGE_KEY,
          type: 'topic',
        },
      ],
      handlers: [HealthcheckConsumer],
    }),
  ],
  controllers: [HealthController],
  providers: [HealthcheckJob, HealthcheckConsumer],
})
export class HealthcheckModule {}
