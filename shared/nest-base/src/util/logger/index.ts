import type { LoggerService } from '@nestjs/common';
import { utilities, WinstonModule } from 'nest-winston';
import * as winston from 'winston';

import { getAppName, getInstanceId } from '../environment';
import { SplunkTransport } from './transports/SplunkTransport';

let logger: LoggerService;
export const initLoggerInstance = (config: {
  splunk: {
    enable: string;
    token: string; // token được tạo từ HEC config
    url: string;
    index: string; // index phải được create trước ở splunk, mỗi một token chỉ allow 1 số index nào đó
    source?: string; // source thì có thể là bất cứ giá trị nào, dùng để seperate mỗi trường
  };
  file?: boolean;
}): LoggerService => {
  if (!logger) {
    logger = WinstonModule.createLogger({
      format: winston.format.combine(
        winston.format.timestamp({
          format: 'YYYY-MM-DD hh:mm:ss',
        }),
        winston.format.json({
          space: 4,
          maximumBreadth: 1,
          maximumDepth: 1,
          circularValue: null,
        })
      ),
      levels: winston.config.cli.levels,
      level: 'silly',
      defaultMeta: {
        iid: getAppName(),
      },
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.ms(),
            winston.format.colorize({
              message: true,
              level: true,
              all: true,
              colors: {
                error: 'bold red',
                debug: 'blue',
                warn: 'underline yellow',
                data: 'magenta',
                info: 'white',
                verbose: 'cyan',
                silly: 'grey',
              },
            }),
            utilities.format.nestLike(getInstanceId(), {
              colors: true,
              prettyPrint: true,
            })
          ),
        }),
        ...(config?.file === true
          ? [
              new winston.transports.File({
                format: winston.format.uncolorize(),
                filename: `logs/${getInstanceId()}.debug.log`,
                level: 'debug',
              }),
              new winston.transports.File({
                format: winston.format.uncolorize(),
                filename: `logs/${getInstanceId()}.info.log`,
                level: 'info',
              }),
              new winston.transports.File({
                format: winston.format.uncolorize(),
                filename: `logs/${getInstanceId()}.error.log`,
                level: 'error',
              }),
              new winston.transports.File({
                format: winston.format.uncolorize(),
                filename: 'logs/combined.log',
              }),
            ]
          : []),
        new SplunkTransport({
          enable: config?.splunk?.enable,
          url: config?.splunk?.url,
          token: config?.splunk?.token,
          index: config?.splunk?.index,
          source: config?.splunk?.source,
        }),
      ],
    });
  }

  return logger;
};

export const getLoggerInstance = () => logger;
