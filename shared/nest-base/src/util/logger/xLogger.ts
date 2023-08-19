/* eslint-disable no-param-reassign */
import { Logger as NestLogger } from '@nestjs/common/services/logger.service';

import type { AbstractContext } from '../context/AbstractContext';

export class XLogger {
  private _logger: NestLogger;

  constructor(
    private context: string,
    private appContext?: AbstractContext,
  ) {
    this._logger = new NestLogger(this.context);
  }

  debug(message: any, metadata?: Record<string, any>): void {
    metadata = this._injectContext();
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
    metadata = this._injectContext();
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
    metadata = this._injectContext();

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
    metadata = this._injectContext();
    if (metadata) {
      this._logger.warn(message, metadata);
    } else {
      this._logger.warn(message);
    }
  }

  private _injectContext(metadata?: Record<string, any>) {
    if (this.appContext) {
      if (typeof metadata === 'undefined') {
        metadata = {};
      }

      if (this.appContext.isUserRequest()) {
        metadata.xCorrelationId = this.appContext.getXCorrelationId();
        metadata.isUserRequest = this.appContext.isUserRequest();
      }
    }

    return metadata;
  }
}
