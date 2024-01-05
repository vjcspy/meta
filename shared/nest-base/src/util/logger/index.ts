import type { LoggerService } from '@nestjs/common';
import { SplunkTransport } from 'chitility/dist/lib/logger/transport/SplunkTransport';
import * as winston from 'winston';
import { createLogger } from 'winston';

import { getAppName, getInstanceId } from '../environment';
import { nestLikeConsoleFormat } from './format/nestlike';
import { WinstonLogger } from './winston';

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
    logger = new WinstonLogger(
      createLogger({
        format: winston.format.combine(
          winston.format.timestamp({
            format: 'isoDateTime',
          }),
          winston.format.json({
            space: 4,
            circularValue: null,
          }),
        ),
        levels: winston.config.cli.levels,
        level: 'silly',
        // defaultMeta: {
        //   appName: getAppName(),
        // },
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
              nestLikeConsoleFormat(getInstanceId(), {
                colors: true,
                prettyPrint: true,
                showMeta: false,
              }),
            ),
          }),
          ...(config?.file === true
            ? [
                // new winston.transports.File({
                //   format: winston.format.combine(
                //     winston.format.uncolorize(),
                //     format.splat(),
                //     format.simple(),
                //   ),
                //   filename: `logs/${getInstanceId()}.debug.log`,
                //   level: 'debug',
                // }),
                // new winston.transports.File({
                //   format: winston.format.combine(
                //     winston.format.uncolorize(),
                //     format.splat(),
                //     format.simple(),
                //   ),
                //   filename: `logs/${getInstanceId()}.info.log`,
                //   level: 'info',
                // }),
                new winston.transports.File({
                  format: winston.format.combine(
                    winston.format.uncolorize(),
                    nestLikeConsoleFormat(getInstanceId(), {
                      colors: false,
                      prettyPrint: true,
                      showMeta: false,
                    }),
                  ),
                  filename: `logs/combined.error.log`,
                  level: 'error',
                  maxsize: 5000000, // Kích thước tối đa của file (1MB)
                  maxFiles: 5, // Số lượng file log tối đa (lưu trữ lịch sử)
                  tailable: true,
                }),
                new winston.transports.File({
                  format: winston.format.combine(
                    winston.format.uncolorize(),
                    nestLikeConsoleFormat(getInstanceId(), {
                      colors: false,
                      prettyPrint: true,
                      showMeta: false,
                    }),
                  ),
                  filename: `logs/combined.warn.log`,
                  level: 'warn',
                  maxsize: 5000000, // Kích thước tối đa của file (1MB)
                  maxFiles: 5, // Số lượng file log tối đa (lưu trữ lịch sử)
                  tailable: true,
                }),
                new winston.transports.File({
                  format: winston.format.combine(
                    winston.format.uncolorize(),
                    nestLikeConsoleFormat(getInstanceId(), {
                      colors: false,
                      prettyPrint: true,
                      showMeta: false,
                    }),
                  ),
                  filename: 'logs/combined.log',
                  maxsize: 5000000, // Kích thước tối đa của file (1MB)
                  maxFiles: 5, // Số lượng file log tối đa (lưu trữ lịch sử)
                  tailable: true,
                }),
              ]
            : []),
          new SplunkTransport({
            appName: getAppName(),
            enable: config?.splunk?.enable,
            url: config?.splunk?.url,
            token: config?.splunk?.token,
            index: config?.splunk?.index,
            source: config?.splunk?.source as any,
          }) as any,
        ],
      }),
    );
  }

  return logger;
};

export const getLoggerInstance = () => logger;
export * from './xLogger';
