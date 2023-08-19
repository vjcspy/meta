import { Logger as NestLogger } from '@nestjs/common/services/logger.service';

export class XLogger {
  private _logger: NestLogger;

  constructor(context: string) {
    this._logger = new NestLogger(context);
  }

  debug(message: any, metadata?: Record<string, any>): void {
    if (metadata) {
      this._logger.debug(message, metadata);
    } else {
      this._logger.debug(message);
    }
  }

  /**
   *
   * @param message
   * @param error
   * @param metadata
   */
  error(message: any, error: Error, metadata?: Record<string, any>): void {
    if (metadata) {
      this._logger.error(message, error, metadata);
    } else {
      this._logger.error(message, error);
    }
  }

  /**
   *
   * @param message
   * @param metadata
   */
  log(message: any, metadata?: Record<string, any>): void {
    if (metadata) {
      this._logger.log(message, metadata);
    } else {
      this._logger.log(message);
    }
  }

  /**
   *
   * @param message
   * @param metadata
   */
  info(message: any, metadata?: Record<string, any>): void {
    this.log(message, metadata);
  }

  verbose(message: any, metadata: Record<string, any>): void {
    if (metadata) {
      this._logger.verbose(message, metadata);
    } else {
      this._logger.verbose(message);
    }
  }

  warn(message: any, metadata?: Record<string, any>): void {
    if (metadata) {
      this._logger.warn(message, metadata);
    } else {
      this._logger.warn(message);
    }
  }
}
