import { BaseModule, getNodeEnv, XLogger } from '@nest/base';
import type { OnApplicationBootstrap, OnModuleInit } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

import { AppService } from './app.service';
import { IpController } from './controller/ip.controller';
import { StrategyHistoryTestResultController } from './controller/strategy-history-test-result.controller';

@Module({
  imports: [
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
    BaseModule,
  ],
  controllers: [StrategyHistoryTestResultController, IpController],
  providers: [AppService],
})
export class AppModule
  extends PrismaClient
  implements OnModuleInit, OnApplicationBootstrap
{
  private readonly logger = new XLogger(AppModule.name);

  constructor(private readonly configService: ConfigService) {
    super();
  }

  async onModuleInit() {
    try {
      await this.$connect();
      this.logger.log('Successfully connected to PostgresDB');
    } catch (e) {
      this.logger.error('Could not connect to PostgresDB', e);
    }
  }

  onApplicationBootstrap(): any {}
}
