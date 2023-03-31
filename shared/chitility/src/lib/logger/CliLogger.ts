import type { LeveledLogMethod } from 'winston';
import winston from 'winston';

import { webConsoleFormat } from './format/web';
import type { LoggerConfig } from './Logger';
import { Logger } from './Logger';

export interface CliLoggerConfig extends LoggerConfig {
  file?: boolean;
}
export class CliLogger extends Logger {
  private file = false;
  constructor(config: CliLoggerConfig | string) {
    if (typeof config === 'string') {
      // eslint-disable-next-line no-param-reassign
      config = {
        type: 'cli',
        context: config,
        file: true,
      };
    }
    // if (typeof config?.level === 'undefined') {
    //   config.level = 'debug';
    // }
    config.type = 'cli';
    super(config);

    this.file = config.file ?? true;
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
        ...(this.file
          ? [
              new winston.transports.File({
                format: winston.format.uncolorize(),
                filename: `logs/debug.log`,
                level: 'debug',
              }),
              new winston.transports.File({
                format: winston.format.uncolorize(),
                filename: `logs/info.log`,
                level: 'info',
              }),
              new winston.transports.File({
                format: winston.format.uncolorize(),
                filename: `logs/error.log`,
                level: 'error',
              }),
              new winston.transports.File({
                format: winston.format.uncolorize(),
                filename: 'logs/combined.log',
              }),
            ]
          : []),
      ],
    });
  }

  debug: LeveledLogMethod = (message: any, ...args: any[]) => {
    return this.getInstance().debug(message, ...args);
  };
}
