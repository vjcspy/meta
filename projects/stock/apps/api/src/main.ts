import {
  getAppName,
  getInstanceId,
  getNodeEnv,
  initLoggerInstance,
} from '@nest/base';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  // logger
  const logger = initLoggerInstance({
    file: process.env.LOG_FILE === 'true',
    splunk: {
      enable: process.env.SPLUNK_ENABLE,
      token: process.env.SPLUNK_TOKEN,
      url: process.env.SPLUNK_URL,
      index: process.env.SPLUNK_INDEX,
      source: `${getAppName()}|${getNodeEnv()}|${getInstanceId()}`,
    },
  });
  const app = await NestFactory.create(AppModule, {
    logger,
  });

  // CORS
  app.enableCors();

  // validation
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  // configuration
  const configService = app.get(ConfigService);

  // port listening
  const port = configService.get('APP_PORT') || 3000;
  await app.listen(port);
  logger.log(`Listening on port ${port}`, 'NestApplication');
}
bootstrap();
