import type { LeveledLogMethod } from 'winston';
import winston from 'winston';

import { webConsoleFormat } from './format/web';
import type { LoggerConfig } from './Logger';
import { Logger } from './Logger';

export type CliLoggerConfig = LoggerConfig;
export class CliLogger extends Logger {
  constructor(config: CliLoggerConfig | string) {
    if (typeof config === 'string') {
      // eslint-disable-next-line no-param-reassign
      config = {
        type: 'cli',
        context: config,
      };
    }
    if (typeof config?.level === 'undefined') {
      // eslint-disable-next-line no-param-reassign
      config.level = 'debug';
    }
    super(config);
  }
  createWinston() {
    return winston.createLogger({
      levels: winston.config.cli.levels,
      level: this.level,
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
            webConsoleFormat({
              colors: true,
            })
          ),
        }),
        ...this.transports,
        // new winston.transports.File({
        //   format: winston.format.uncolorize(),
        //   filename: `logs/${getInstanceId()}.debug.log`,
        //   level: 'debug',
        // }),
        // new winston.transports.File({
        //   format: winston.format.uncolorize(),
        //   filename: `logs/${getInstanceId()}.info.log`,
        //   level: 'info',
        // }),
        // new winston.transports.File({
        //   format: winston.format.uncolorize(),
        //   filename: `logs/${getInstanceId()}.error.log`,
        //   level: 'error',
        // }),
        // new winston.transports.File({
        //   format: winston.format.uncolorize(),
        //   filename: 'logs/combined.log',
        // }),
      ],
    });
  }

  debug: LeveledLogMethod = (message: any, ...args: any[]) => {
    return this.getInstance().debug(message, ...args);
  };
}
