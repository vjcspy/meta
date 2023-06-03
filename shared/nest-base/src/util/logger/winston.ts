import type { LoggerService } from '@nestjs/common';
import type { Logger } from 'winston';

export interface LogEntry {
  message: string | any[];
  level?: string;
  context?: any;
  metadata?: any;
}

export class WinstonLogger implements LoggerService {
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

  public error(message: any, trace?: string, context?: string): any {
    context = context || this.context;

    if (message instanceof Error) {
      // eslint-disable-next-line unused-imports/no-unused-vars
      const { message: msg, name, stack, ...meta } = message;

      return this.logger.error(msg, {
        context,
        stack: [trace || message.stack],
        error: message,
        ...meta,
      });
    }

    if ('object' === typeof message) {
      const { message: msg, ...meta } = message;

      return this.logger.error(msg as string, {
        context,
        stack: [trace],
        ...meta,
      });
    }

    return this.logger.error(message, { context, stack: [trace] });
  }

  public warn(message: any, context?: string): any {
    context = context || this.context;

    if ('object' === typeof message) {
      const { message: msg, ...meta } = message;

      return this.logger.warn(msg as string, { context, ...meta });
    }

    return this.logger.warn(message, { context });
  }

  public verbose?(message: any, context?: string): any {
    context = context || this.context;

    if ('object' === typeof message) {
      const { message: msg, ...meta } = message;

      return this.logger.verbose(msg as string, { context, ...meta });
    }

    return this.logger.verbose(message, { context });
  }

  public getWinstonLogger(): Logger {
    return this.logger;
  }
}
