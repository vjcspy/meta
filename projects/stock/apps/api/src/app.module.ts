import { CoreModule } from '@modules/core/core.module';
import { SlackHelper } from '@modules/core/helper/slack.helper';
import { StockInfoModule } from '@modules/stock-info/stock-info.module';
import { TestbedModule } from '@modules/testbed/testbed.module';
import { BaseModule, getNodeEnv, isProduction, XLogger } from '@nest/base';
import type { LoggerInstance } from '@nest/base/dist/util/logger/winston';
import { RabbitMQModule } from '@nest/rabbitmq';
import type { OnApplicationBootstrap, OnModuleInit } from '@nestjs/common';
import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { PrismaClient } from '@prisma/client';
import * as process from 'process';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      // If a variable is found in multiple files, the first one takes precedence.
      envFilePath: [
        // `${process.cwd()}/.env.production`,
        // `${process.cwd()}/.env`,
        `.env.${getNodeEnv()}.local`,
        '.env.local',
        `.env.${getNodeEnv()}`,
        '.env.default', // Khong su dung duoc .env vi trong code cua nest luc nao cung uu tien file nay
      ],
    }),
    ...(process.env.CRON === 'false'
      ? [CoreModule]
      : [CoreModule, ScheduleModule.forRoot()]),
    BaseModule,
    RabbitMQModule.register({
      uri: `amqp://${process.env.RABBITMQ_USERNAME}:${process.env.RABBITMQ_PASS}@${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`,
      // Nếu không khai báo name thì mặc định là đang config cho default connection
      // name:'default',
      exchanges: [
        {
          name: 'testbed-exchange1',
          type: 'topic',
        },
      ],
      // Default channel sẽ luôn được tạo và sử dụng name của connection trừ trường hợp tự khai báo 1 default channel
      channels: {
        'channel-1': {
          prefetchCount: 1,
          default: true,
        },
        'channel-2': {
          prefetchCount: 2,
        },
      },
      // Muốn handler nào được chạy thì cần phải khai báo, nếu khai báo handler ở đây thì không cần redeclare ở provider nữa
      handlers: [],
    }),
    StockInfoModule,
    TestbedModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule
  extends PrismaClient
  implements OnModuleInit, OnApplicationBootstrap
{
  private readonly logger: LoggerInstance = new Logger(AppModule.name);

  constructor(
    private readonly configService: ConfigService,
    private slackHelper: SlackHelper,
  ) {
    super();
  }

  async onModuleInit() {
    // this.logger.log(`Rabbit port ${this.configService.get('RABBITMQ_PORT')}`);
    try {
      await this.$connect();
      this.logger.log('Successfully connected to PostgresDB');
    } catch (e) {
      this.logger.error('Could not connect to PostgresDB', e);
    }
  }

  onApplicationBootstrap(): any {
    if (isProduction()) {
      this.slackHelper.postMessage(SlackHelper.DEFAULT_CHANNEL_NAME, {
        text: `Successfully bootstrap`,
      });
    }
  }
}
