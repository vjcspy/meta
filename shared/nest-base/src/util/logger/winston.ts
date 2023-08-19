import type { LoggerService } from '@nestjs/common';
import type { Logger } from 'winston';

export interface LogEntry {
  message: string | any[];
  level?: string;
  context?: any;
  metadata?: any;
}

export interface LoggerInstance extends LoggerService {
  /**
   * Write a 'log' level log.
   */
  log(message: any, ...metadata: any[]): any;
  /**
   * Write an 'error' level log.
   */
  error(message: any, ...metadata: any[]): any;
  /**
   * Write a 'warn' level log.
   */
  warn(message: any, ...metadata: any[]): any;
  /**
   * Write a 'debug' level log.
   */
  debug?(message: any, ...metadata: any[]): any;
  /**
   * Write a 'verbose' level log.
   */
  verbose?(message: any, ...metadata: any[]): any;
}

export class WinstonLogger implements LoggerInstance {
  private context?: string;

  constructor(private readonly logger: Logger) {}

  public setContext(context: string) {
    this.context = context;
  }

  /**
   * Message se duoc print tren console
   * metadata la cac object se duoc Stringtify va luu xuong file/splunk
   *
   * @param message
   * @param metadata
   */
  public log(message: any, ...metadata: any[]): void {
    if (metadata.length > 0) {
      /*
       * NestJS luon truyen context la last param
       * */
      const context = metadata.pop();
      this.logger.info(message, { context, metadata });
    } else {
      this.logger.info(message, { context: 'Unknown' });
    }
  }

  public debug(message: any, ...metadata: any[]): void {
    if (metadata.length > 0) {
      /*
       * NestJS luon truyen context la last param
       * */
      const context = metadata.pop();
      this.logger.debug(message, { context, metadata });
    } else {
      this.logger.debug(message, { context: 'Unknown' });
    }
  }

  // public debug?(message: any, context?: string): any {
  //   context = context || this.context;
  //
  //   if ('object' === typeof message) {
  //     const { message: msg, ...meta } = message;
  //
  //     return this.logger.debug(msg as string, { context, ...meta });
  //   }
  //
  //   return this.logger.debug(message, { context });
  // }

  // public log(message: any, context?: string): any {
  //   context = context || this.context;
  //
  //   if ('object' === typeof message) {
  //     const { message: msg, level = 'info', ...meta } = message;
  //
  //     return this.logger.log(level, msg as string, { context, ...meta });
  //   }
  //
  //   return this.logger.info(message, { context });
  // }

  public error(message: any, trace?: any, context?: string): any {
    context = context || this.context;

    if (message instanceof Error) {
      // eslint-disable-next-line unused-imports/no-unused-vars
      const { message: msg, name, stack, ...meta } = message;

      console.error(message);

      return this.logger.error(msg, {
        context,
        stack: [trace || message.stack],
        error: message,
        ...meta,
      });
    }
    if (typeof message === 'object') {
      const { message: msg, ...meta } = message;

      return this.logger.error(msg as string, {
        context,
        stack: [trace],
        ...meta,
      });
    }
    if (trace instanceof Error) {
      console.error(trace);
      const { message: msg, name, stack, ...meta } = trace;
      return this.logger.error(message, {
        context,
        metadata: {
          stack,
          error: msg,
          name,
          ...meta,
        },
      });
    }

    return this.logger.error(message, { context });
  }

  public warn(message: any, context?: string): any {
    context = context || this.context;

    if (typeof message === 'object') {
      const { message: msg, ...meta } = message;

      return this.logger.warn(msg as string, { context, ...meta });
    }

    return this.logger.warn(message, { context });
  }

  public verbose?(message: any, context?: string): any {
    context = context || this.context;

    if (typeof message === 'object') {
      const { message: msg, ...meta } = message;

      return this.logger.verbose(msg as string, { context, ...meta });
    }

    return this.logger.verbose(message, { context });
  }

  public getWinstonLogger(): Logger {
    return this.logger;
  }
}
